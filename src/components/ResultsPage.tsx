import { ReactNode } from 'react';

interface ResultsPageProps {
    children: ReactNode;
}

function ResultsPage({ children }: ResultsPageProps) {
    return <div className="h-full">{children}</div>;
}

export default ResultsPage;

