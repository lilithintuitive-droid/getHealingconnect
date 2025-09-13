import { useState } from "react";
import Header from '../Header';

export default function HeaderExample() {
  const [isDark, setIsDark] = useState(false);

  return (
    <Header 
      isDark={isDark} 
      onThemeToggle={() => setIsDark(!isDark)} 
    />
  );
}