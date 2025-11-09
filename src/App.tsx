import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { AuthForm } from './components/AuthForm';
import { TaskManager } from './components/TaskManager';

function App() {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(!!session);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return <AuthForm onAuthSuccess={() => setSession(true)} />;
  }

  return <TaskManager />;
}

export default App;
