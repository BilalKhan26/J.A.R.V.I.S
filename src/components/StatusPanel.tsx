import React from 'react';
import { VoiceAssistantState } from '../types';
import { Wifi, WifiOff, Volume2, VolumeX, Cpu, Activity, Brain, BrainCircuit } from 'lucide-react';

interface StatusPanelProps {
  state: VoiceAssistantState;
  isOnline: boolean;
  isAIEnabled?: boolean;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ state, isOnline, isAIEnabled = false }) => {
  const statusItems = [
    {
      icon: isOnline ? Wifi : WifiOff,
      label: 'Connection',
      value: isOnline ? 'Online' : 'Offline',
      color: isOnline ? 'text-green-400' : 'text-red-400'
    },
    {
      icon: state.isSpeaking ? Volume2 : VolumeX,
      label: 'Speech',
      value: state.isSpeaking ? 'Speaking' : 'Silent',
      color: state.isSpeaking ? 'text-blue-400' : 'text-gray-400'
    },
    {
      icon: Cpu,
      label: 'Processing',
      value: state.isProcessing ? 'Active' : 'Idle',
      color: state.isProcessing ? 'text-yellow-400' : 'text-gray-400'
    },
    {
      icon: Activity,
      label: 'Status',
      value: state.isActive ? 'Ready' : 'Standby',
      color: state.isActive ? 'text-green-400' : 'text-gray-400'
    },
    {
      icon: isAIEnabled ? Brain : BrainCircuit,
      label: 'AI Mode',
      value: isAIEnabled ? 'Enabled' : 'Disabled',
      color: isAIEnabled ? 'text-purple-400' : 'text-gray-400'
    }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">System Status</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {statusItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <div>
              <p className="text-xs text-gray-300">{item.label}</p>
              <p className={`text-xs font-medium ${item.color}`}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-300">Commands Processed</span>
          <span className="text-blue-400 font-medium">{state.commandHistory.length}</span>
        </div>
        {!isAIEnabled && (
          <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-400">
            Add DeepSeek API key for intelligent responses
          </div>
        )}
      </div>
    </div>
  );
};