import React from 'react';
import { Command } from '../types';
import { User, Bot, Clock } from 'lucide-react';

interface CommandHistoryProps {
  commands: Command[];
}

export const CommandHistory: React.FC<CommandHistoryProps> = ({ commands }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 max-h-96 overflow-y-auto">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        Recent Commands
      </h3>
      
      {commands.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          No commands yet. Start by saying "Jarvis" or clicking the microphone.
        </p>
      ) : (
        <div className="space-y-3">
          {commands.slice(-10).reverse().map((command) => (
            <div
              key={command.id}
              className={`p-3 rounded-lg transition-all duration-200 ${
                command.type === 'user' 
                  ? 'bg-blue-500/20 border-l-4 border-blue-500' 
                  : 'bg-green-500/20 border-l-4 border-green-500'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {command.type === 'user' ? (
                    <User className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Bot className="w-5 h-5 text-green-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm leading-relaxed">
                    {command.text}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {command.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};