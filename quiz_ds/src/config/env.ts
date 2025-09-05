// src/config/env.ts
import Constants from 'expo-constants';
export const API_BASE = (Constants.expoConfig?.extra as any)?.API_BASE as string;
