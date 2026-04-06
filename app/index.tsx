// app/index.tsx

import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";
import PageStart from "./app";

export default function App() {
  return (
    <SafeAreaProvider>
      <PageStart />
    </SafeAreaProvider>
  );
}