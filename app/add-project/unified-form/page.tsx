import UnifiedProjectForm from './UnifiedProjectForm';

export default function UnifiedFormPage() {
    return (
        <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Add New Project</h1>
                <UnifiedProjectForm />
            </div>
        </div>
    );
} 