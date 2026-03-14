// src/ai/useAgent.js
// React hook for using the AI Agent
import { useRef } from 'react';
import Agent from './Agent';

export default function useAgent() {
  const agentRef = useRef(null);
  if (!agentRef.current) {
    agentRef.current = new Agent();
  }
  return agentRef.current;
}
