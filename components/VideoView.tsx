
import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';

const VideoView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState(''); // To store the prompt actually used
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [hasKey, setHasKey] = useState<boolean>(false);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      const selected = await window.aistudio?.hasSelectedApiKey();
      setHasKey(!!selected);
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    // @ts-ignore
    await window.aistudio?.openSelectKey();
    setHasKey(true);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setVideoUrl(null);
    setCurrentPrompt(prompt);
    setStatus('Initializing Veo operation...');

    try {
      let operation = await GeminiService.generateVideo(prompt);
      
      const poll = async () => {
        const update = await GeminiService.checkVideoOperation(operation);
        if (update.done) {
          if (update.response?.generatedVideos?.[0]?.video?.uri) {
            setStatus('Finalizing High-Quality Render...');
            const blob = await GeminiService.fetchVideoBlob(update.response.generatedVideos[0].video.uri);
            setVideoUrl(URL.createObjectURL(blob));
            setStatus('Render Complete');
            setIsGenerating(false);
          } else {
            throw new Error('No video found in response');
          }
        } else {
          setStatus('Veo is rendering frames... (can take 1-3 minutes)');
          setTimeout(poll, 10000);
        }
      };
      
      poll();
    } catch (error: any) {
      console.error('Video error:', error);
      if (error.message?.includes('Requested entity was not found')) {
        setHasKey(false);
      }
      setIsGenerating(false);
      setStatus('Generation failed.');
    }
  };

  if (!hasKey) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-pink-500/10 flex items-center justify-center">
          <i className="fas fa-key text-3xl text-pink-400"></i>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Premium API Key Required</h2>
          <p className="text-gray-400 max-w-sm mt-2">To use Veo video generation, you must select a paid API key from your Google Cloud project.</p>
        </div>
        <button 
          onClick={handleSelectKey}
          className="px-8 py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-bold shadow-lg shadow-pink-600/30 transition-all"
        >
          Select Premium Key
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Cinematic Video</h2>
        <p className="text-gray-400">Transform your imagination into high-quality cinematic motion.</p>
      </div>

      <div className="glass p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Visual Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A slow tracking shot of a misty forest at dawn..."
            className="w-full h-24 bg-gray-900 border border-gray-800 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white"
            disabled={isGenerating}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className={`px-10 py-4 rounded-2xl font-black text-lg transition-all flex items-center gap-3
              ${isGenerating ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-pink-600 to-orange-500 hover:scale-[1.02] active:scale-95 shadow-xl shadow-pink-600/20 text-white'}
            `}
          >
            {isGenerating ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-film"></i>}
            {isGenerating ? 'Generating...' : 'Create Masterpiece'}
          </button>
        </div>
      </div>

      {(isGenerating || videoUrl) && (
        <div className="space-y-6 animate-fadeIn">
          {isGenerating && (
            <div className="flex flex-col items-center gap-4 py-8 animate-pulse">
               <div className="w-16 h-16 rounded-full border-4 border-t-pink-500 border-gray-800 animate-spin"></div>
               <p className="text-pink-400 font-bold tracking-wide uppercase text-xs">{status}</p>
            </div>
          )}

          {videoUrl && (
            <div className="rounded-3xl overflow-hidden border-2 border-gray-800 shadow-3xl bg-black">
              <video src={videoUrl} controls autoPlay loop className="w-full h-auto" />
            </div>
          )}

          {/* Prompt and Status Metadata Display */}
          <div className="p-6 rounded-[2rem] border border-gray-800/50 bg-gray-900/40 backdrop-blur-xl space-y-4">
             <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Render Metadata</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isGenerating ? 'bg-pink-500/20 text-pink-400 animate-pulse' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {status}
                </span>
             </div>
             <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Prompt</p>
                <p className="text-sm text-gray-300 italic leading-relaxed">"{currentPrompt || prompt}"</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoView;
