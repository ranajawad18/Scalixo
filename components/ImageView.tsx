
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';

const ImageView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [quality, setQuality] = useState<'standard' | 'high'>('standard');
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setResult(null);
    try {
      const url = await GeminiService.generateImage(prompt, quality);
      setResult(url);
    } catch (error) {
      console.error('Image gen error:', error);
      alert('Failed to generate image. Try a different prompt.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Image Studio</h2>
          <p className="text-gray-400">Describe what you want to see, and Lumina will create it.</p>
        </div>

        <div className="glass p-6 rounded-3xl space-y-4 shadow-xl">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., A futuristic cyberpunk city street with neon lights and flying cars, digital art style..."
            className="w-full h-32 bg-gray-900 border border-gray-800 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white resize-none"
          />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800">
              <button
                onClick={() => setQuality('standard')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${quality === 'standard' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Standard
              </button>
              <button
                onClick={() => setQuality('high')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${quality === 'high' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Ultra HD
              </button>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className={`
                px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2
                ${isGenerating ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-purple-600/30 text-white'}
              `}
            >
              {isGenerating ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-magic"></i>}
              {isGenerating ? 'Synthesizing...' : 'Generate Image'}
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="max-w-2xl mx-auto animate-slideUp">
          <div className="relative group rounded-3xl overflow-hidden border-4 border-gray-900 shadow-2xl">
            <img src={result} alt="Generated" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <a href={result} download="lumina-image.png" className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                <i className="fas fa-download text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      )}

      {isGenerating && (
        <div className="max-w-2xl mx-auto h-[400px] bg-gray-900/40 border border-gray-800 rounded-3xl flex flex-col items-center justify-center gap-6 animate-pulse">
           <i className="fas fa-palette text-6xl text-gray-700"></i>
           <div className="space-y-2 text-center">
             <p className="text-gray-500 font-medium">Mixing colors and pixels...</p>
             <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
               <div className="h-full bg-purple-600 w-1/2 animate-[loading_2s_ease-in-out_infinite]"></div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ImageView;
