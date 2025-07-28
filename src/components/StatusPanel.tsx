import React from 'react';
import { VoiceAssistantState } from '../types';
import { Wifi, WifiOff, Volume2, VolumeX, Cpu, Activity } from 'lucide-react';

interface StatusPanelProps {
  state: VoiceAssistantState;
  isOnline: boolean;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ state, isOnline }) => {
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
    }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">System Status</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {statusItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <div>
              <p className="text-sm text-gray-300">{item.label}</p>
              <p className={`text-sm font-medium ${item.color}`}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-300">Commands Processed</span>
          <span className="text-blue-400 font-medium">{state.commandHistory.length}</span>
        </div>
      </div>
    </div>
  );
};