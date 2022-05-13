import { FC, PropsWithChildren } from 'react';
import './Loader.less';

type LoaderProps = PropsWithChildren<{ loading: boolean; className: string }>;

const Loader: FC<Partial<LoaderProps>> = ({ loading = true, className = '', children }) =>
  loading ? <div className={['loader-page', className].join(' ').trim()} /> : <>{children}</>;

export { Loader };
