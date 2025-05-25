
import { ProfileForm } from "@/components/profile/ProfileForm";

const Profile = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Meu Perfil</h1>
          <p className="text-muted-foreground mt-1">Gerencie suas informações pessoais e de segurança</p>
        </div>
      </div>
      
      <ProfileForm />
    </div>
  );
};

export default Profile;
