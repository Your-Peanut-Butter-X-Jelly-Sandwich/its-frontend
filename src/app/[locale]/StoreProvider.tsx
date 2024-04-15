'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect, useState } from 'react';
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const storeAndPersistorRef = useRef<{ store: any; persistor: any }>();

  useEffect(() => {
    setIsClient(true);
    if (!storeAndPersistorRef.current) {
      storeAndPersistorRef.current = makeStore();
    }
  }, []);

  if (!isClient) return null;

  return (
    <Provider store={storeAndPersistorRef.current?.store}>
      <PersistGate loading={null} persistor={storeAndPersistorRef.current?.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
