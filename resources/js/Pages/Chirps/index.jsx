import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Chirp from "@/Components/Chirp";

export default function index({ auth, chirps }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('chirps.store', { onSuccess: () => reset() }));
    }

    return <AuthenticatedLayout auth={auth}>
        <Head title="Chirps" />
        <div className="max-w-2xl p-4 mx-auto sm:p-6 lg:p-8">
            <form onSubmit={submit}>
                <textarea
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opcatity-50"
                    value={data.message}
                    placeholder="What's on your mind?"
                    onChange={e => setData('message', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2"/>
                    <PrimaryButton className="mt-4" processing={processing}>Chirp</PrimaryButton>
            </form>
            <div className="mt-6 bg-white divide-y rounded-lg shadow-sm">
                {chirps.map(chirp => (<Chirp key={chirp.id} chirp={chirp} />))}
            </div>
        </div>
    </AuthenticatedLayout>
}