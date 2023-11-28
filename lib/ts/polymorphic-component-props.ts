import React from 'react';

type AsProp<C extends React.ElementType> = {
  as?: C;
};

export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props extends object = {}
> = AsProp<C> & React.ComponentPropsWithoutRef<C> & Props;
