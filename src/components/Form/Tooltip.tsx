'use client';

import { useState } from 'react';
import classNames from 'classnames';

interface TooltipProps {
    tooltip: {
        position: string;
        title: string;
        content: React.ReactNode;
    };
    children?: React.ReactNode;
}

export default function Tooltip({ tooltip, children }: TooltipProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block">
            <button
                type="button"
                className="ml-2 inline-flex items-center justify-center w-5 h-5 text-blue-600 hover:text-blue-800 cursor-help"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={handleClick}
            >
                {children || 'ⓘ'}
            </button>
            {isOpen && (
                <div
                    className={classNames(
                        'absolute z-50 w-64 p-4 text-sm bg-white border border-gray-300 rounded-lg shadow-lg',
                        tooltip.position === 'top' && 'bottom-full mb-2 right-0',
                        tooltip.position === 'bottom' && 'top-full mt-2 right-0',
                        tooltip.position === 'left' && 'right-full mr-2 top-0',
                        tooltip.position === 'right' && 'left-full ml-2 top-0',
                        !tooltip.position && 'bottom-full mb-2 right-0',
                    )}
                >
                    {tooltip.title && (
                        <div className="font-semibold text-gray-900 mb-2">
                            {tooltip.title}
                        </div>
                    )}
                    <div className="text-gray-700">{tooltip.content}</div>
                </div>
            )}
        </div>
    );
}

