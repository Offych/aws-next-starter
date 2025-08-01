import UnifiedProjectForm from './unified-form/UnifiedProjectForm';

export default function AddProjectPage() {
    return (
        <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Add New Project</h1>
                <UnifiedProjectForm />
            </div>
        </div>
    )
}