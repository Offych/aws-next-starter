'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { Label } from '@/components/ui/label';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const steps = [
    { title: 'Step One', route: 'step-one', link: '/add-project/step-one' },
    { title: 'Step Two', route: 'step-two', link: '/add-project/step-two' },
    { title: 'Step Three', route: 'step-three', link: '/add-project/step-three' },
    { title: 'Review', route: 'review', link: '/add-project/review' }
];

export default function StepNavigation() {
    const pathname = usePathname();
    const currentPath = pathname.split('/').pop();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const currentStep = steps.findIndex(step => step.route === currentPath);
        setCurrentStep(currentStep);
    }, [currentPath]);

    return (
        <div className='mb-5 lg:mb-0 min-w-60'>
            {/*Back button*/}
            <Link href={steps[currentStep - 1]?.link || steps[0].link}
                prefetch={true}
                className="flex items-center gap-2 text-sm disabled:text-white/50 lg:mb-4 lg:gap-5"
                onClick={() => setCurrentStep(currentStep - 1)}
            >
                Back
            </Link>

            {/* list of steps */}
            <div className='relative flex flex-grow justify-between lg:flex-col lg:justify-start lg:gap-4'>
                {steps.map((step, index) => (
                    <Link
                        key={step.link}
                        href={step.link}
                        className={clsx(
                            'group flex items-center gap-3 text-sm px-0 py-1 lg:px-0 lg:py-1',
                        )}
                        onClick={() => setCurrentStep(index)}
                        prefetch={true}
                    >
                        <span className={clsx(
                            'flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-background text-sm font-medium transition-colors duration-200 lg:h-12 lg:w-12 lg:text-lg',
                            {
                                'border-primary bg-primary text-white': currentPath === step.route,
                                'bg-background text-foreground group-hover:bg-accent/60': currentPath !== step.route,
                            }
                        )}>
                            {index + 1}
                        </span>
                        <Label
                            className={clsx(
                                'hidden lg:flex',
                                {
                                    'font-semibold text-primary': currentPath === step.route,
                                    'font-medium text-foreground group-hover:text-primary': currentPath !== step.route,
                                }
                            )}
                        >
                            {step.title}
                        </Label>
                    </Link>
                ))}
                {/* mobile background dashes */}
                <div className='absolute top-4 flex h-2 w-full border-b border-dashed lg:hidden' />
            </div>
        </div>
    )
}
