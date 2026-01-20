
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { encode, decode, decodeAudioData } from './AudioUtils';

const LiveView: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const currentTranscriptionRef = useRef({ input: '', output: '' });

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsActive(false);
  };

  const startSession = async () => {
    try {
      setIsConnecting(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const inputAudioContext = new AudioContext({ sampleRate: 16000 });
      const outputAudioContext = new AudioContext({ sampleRate: 24000 });
      audioContextRef.current = inputAudioContext;
      outputAudioContextRef.current = outputAudioContext;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: any) => {
            // Handle Transcription
            if (message.serverContent?.outputTranscription) {
              currentTranscriptionRef.current.output += message.serverContent.outputTranscription.text;
            } else if (message.serverContent?.inputTranscription) {
              currentTranscriptionRef.current.input += message.serverContent.inputTranscription.text;
            }

            if (message.serverContent?.turnComplete) {
              const { input, output } = currentTranscriptionRef.current;
              if (input || output) {
                setTranscription(prev => [...prev.slice(-10), `You: ${input}`, `AI: ${output}`]);
              }
              currentTranscriptionRef.current = { input: '', output: '' };
            }

            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: () => stopSession(),
          onclose: () => stopSession(),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'You are Lumina, a helpful real-time AI companion. Keep your spoken responses concise and natural.',
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        }
      });
      
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 h-[calc(100vh-12rem)]">
      <div className="relative">
        <div className={`
          w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500
          ${isActive ? 'bg-emerald-500/20 scale-110' : 'bg-gray-800 scale-100'}
        `}>
          <div className={`
            w-36 h-36 rounded-full flex items-center justify-center text-5xl
            ${isActive ? 'bg-emerald-500 text-white shadow-[0_0_50px_rgba(16,185,129,0.4)] animate-pulse' : 'bg-gray-700 text-gray-400'}
          `}>
            <i className={`fas ${isActive ? 'fa-wave-square' : 'fa-microphone-slash'}`}></i>
          </div>
          
          {isActive && (
            <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-ping opacity-20"></div>
          )}
        </div>
      </div>

      <div className="text-center space-y-4 max-w-lg">
        <h2 className="text-3xl font-bold">{isActive ? 'Live Conversation' : 'Start Voice Session'}</h2>
        <p className="text-gray-400">Interact with Lumina naturally using low-latency voice. Experience zero-delay reasoning.</p>
      </div>

      <div className="w-full max-w-xl glass rounded-2xl p-6 h-48 overflow-y-auto space-y-2">
        {transcription.length === 0 ? (
          <p className="text-center text-gray-500 mt-12 text-sm italic">Transcription will appear here during session...</p>
        ) : (
          transcription.map((t, i) => (
            <p key={i} className={`text-sm ${t.startsWith('You:') ? 'text-blue-400' : 'text-emerald-400 font-medium'}`}>{t}</p>
          ))
        )}
      </div>

      <button
        onClick={isActive ? stopSession : startSession}
        disabled={isConnecting}
        className={`
          px-12 py-5 rounded-full font-black text-xl transition-all shadow-xl
          ${isActive 
            ? 'bg-red-600 hover:bg-red-500 shadow-red-600/20' 
            : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'}
          ${isConnecting ? 'opacity-50 cursor-wait' : 'hover:scale-105'}
        `}
      >
        {isConnecting ? (
          <><i className="fas fa-spinner fa-spin mr-2"></i> Connecting...</>
        ) : isActive ? (
          <><i className="fas fa-stop mr-2"></i> End Session</>
        ) : (
          <><i className="fas fa-play mr-2"></i> Start Talking</>
        )}
      </button>
    </div>
  );
};

export default LiveView;
