import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <MainLayout
            user={auth.user}
            pageTitle={'Dashboard'}
        >
           
        </MainLayout>
    );
}
