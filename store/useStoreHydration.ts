import React from 'react';
import { PersistOptions } from 'zustand/middleware';

type PersistListener<S> = (state: S) => void;
type StorePersist<S, Ps> = {
  setOptions: (options: Partial<PersistOptions<S, Ps>>) => void;
  clearStorage: () => void;
  rehydrate: () => Promise<void> | void;
  hasHydrated: () => boolean;
  onHydrate: (fn: PersistListener<S>) => () => void;
  onFinishHydration: (fn: PersistListener<S>) => () => void;
  getOptions: () => Partial<PersistOptions<S, Ps>>;
};

export const useStoreHydration = (storePersist: StorePersist<any, any>) => {
  const [hydrated, setHydrated] = React.useState(storePersist.hasHydrated);

  React.useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.
    const unsubHydrate = storePersist.onHydrate(() => setHydrated(false));

    const unsubFinishHydration = storePersist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(storePersist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
