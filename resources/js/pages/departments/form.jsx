import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { RhPage } from '@/components/rh-page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export default function DepartmentForm({ department }) {
    const editing = Boolean(department);
    return (
        <>
            <Head
                title={
                    editing ? 'Modifier le département' : 'Nouveau département'
                }
            />
            <RhPage
                title={
                    editing ? 'Modifier le département' : 'Nouveau département'
                }
            >
                <Form
                    action={
                        editing
                            ? `/departments/${department.id}`
                            : '/departments'
                    }
                    method={editing ? 'put' : 'post'}
                    options={{ preserveScroll: true }}
                    disableWhileProcessing
                    className="rh-form-panel max-w-2xl space-y-5 p-6 md:p-8"
                >
                    {({ errors, processing }) => (
                        <>
                            {Object.keys(errors).length > 0 && (
                                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    Vérifiez les champs signalés avant de
                                    continuer.
                                </div>
                            )}
                            <div className="border-b border-border/70 pb-4">
                                <p className="rh-kicker">Structure interne</p>
                                <h2 className="text-lg font-bold text-foreground">
                                    Informations du département
                                </h2>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="nom">Nom *</Label>
                                <Input
                                    id="nom"
                                    name="nom"
                                    required
                                    maxLength={255}
                                    defaultValue={department?.nom}
                                />
                                <InputError message={errors.nom} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="localisation">
                                    Localisation *
                                </Label>
                                <Input
                                    id="localisation"
                                    name="localisation"
                                    required
                                    maxLength={255}
                                    defaultValue={department?.localisation}
                                />
                                <InputError message={errors.localisation} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    defaultValue={department?.description}
                                    rows={5}
                                    maxLength={2000}
                                    className="rounded-lg border bg-card px-3 py-2 text-sm text-foreground"
                                />
                                <InputError message={errors.description} />
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    {editing ? 'Enregistrer' : 'Créer'}
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/departments">Annuler</Link>
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </RhPage>
        </>
    );
}
