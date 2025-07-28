import React from 'react';
import { VoiceVisualizer } from './components/VoiceVisualizer';
import { CommandHistory } from './components/CommandHistory';
import { StatusPanel } from './components/StatusPanel';
import { useVoiceAssistant } from './hooks/useVoiceAssistant';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { Bot, Sparkles } from 'lucide-react';

function App() {
  const { state, isAIEnabled, toggleListening } = useVoiceAssistant();
  const isOnline = useOnlineStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Bot className="w-12 h-12 text-blue-400 mr-3" />
            <h1 className="text-5xl font-bold text-white">
              J.A.R.V.I.S
            </h1>
            <Sparkles className="w-8 h-8 text-purple-400 ml-3" />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Just A Rather Very Intelligent System - Your advanced voice assistant
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Voice Interface */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <VoiceVisualizer
                isListening={state.isListening}
                isProcessing={state.isProcessing}
                onToggleListening={toggleListening}
              />
            </div>

            <CommandHistory commands={state.commandHistory} />
          </div>

          {/* Status Panel */}
          <div className="space-y-6">
            <StatusPanel state={state} isOnline={isOnline} isAIEnabled={isAIEnabled} />
            
            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Commands</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-700/50 rounded text-gray-300">
                  "Open Google/YouTube/Facebook"
                </div>
                <div className="p-2 bg-gray-700/50 rounded text-gray-300">
                  "Play [song name]"
                </div>
                <div className="p-2 bg-gray-700/50 rounded text-gray-300">
                  "What's the news?"
                </div>
                <div className="p-2 bg-gray-700/50 rounded text-gray-300">
                  "What time is it?"
                </div>
                <div className="p-2 bg-gray-700/50 rounded text-gray-300">
                  "Help"
                </div>
                {isAIEnabled && (
                  <div className="p-2 bg-purple-500/20 rounded text-purple-300 border border-purple-500/30">
                    "Ask me anything!" (DeepSeek AI)
                  </div>
                )}
              </div>
            </div>

            {/* System Info */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">System Info</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Browser Support:</span>
                  <span className="text-green-400">✓ Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Speech Recognition:</span>
                  <span className="text-green-400">✓ Ready</span>
                </div>
                <div className="flex justify-between">
                  <span>Text-to-Speech:</span>
                  <span className="text-green-400">✓ Ready</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Integration:</span>
                  <span className={isAIEnabled ? "text-green-400" : "text-yellow-400"}>
                    {isAIEnabled ? "✓ Active" : "⚠ Setup Required"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-400">
          <p>Built with React, TypeScript, Web Speech API {isAIEnabled && '& DeepSeek AI'}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;