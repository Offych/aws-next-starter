import React from 'react'
import StepNavigation from '@/components/step-navigation'

export default function AddProjectLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='container mx-auto px-2 lg:px-0'>
            {/* <PageHeader title="Add Project" subtitle="Add a new project" /> */}
            <div className='mt-12 mb-20 flex flex-col gap-4 lg:flex-row lg:gap-x-4 items-start'>
                {/* Sidebar */}
                <aside className="w-full lg:w-44 flex-shrink-0">
                    <StepNavigation />
                </aside>
                {/* Form area */}
                <main className="flex-1 w-full">
                    {children}
                </main>
            </div>
        </div>
    )
}
