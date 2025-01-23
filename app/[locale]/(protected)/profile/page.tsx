import initTranslations from "@/app/i18n";
import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { userProfile } from "@/lib/profile";
import { userProfile } from "@/lib/profile";
import { UserInfoData } from "@/schemas";
import Image from "next/image";
import { Suspense } from "react";
import Head from "../_components/Head";
import ProfileDetail from "../_components/ProfileDetail";
import ProfileHead from "../_components/ProfileHead";
import ReportDetail from "../_components/ReportDetail";

const i18nNamespace = ["navbar", "footer", "profile"];

export default async function ProfilePage({ params: { locale } }: any) {
  const { t, resources } = await initTranslations(locale, i18nNamespace);

  const profileData: UserInfoData | undefined = await userProfile();
  // const profileData: ProfileData | undefined = await userProfile();

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespace}
    >
      <Navbar locale={locale} />
      <div className="w-full h-full overflow-y-auto flex flex-col bg-[var(--clr-silver)]">
        <Head>
          <Image
            src={"/profile/backdrop.png"}
            fill
            alt="-"
            className=" object-cover bg-no-repeat"
          />
        </Head>
        <section>
          <Wrapper>
            <div className="md:px-10 xl:px-14 w-full -mt-16 -sm:mt-[72px] md:-mt-20 ">
              <Suspense fallback={<ProfileHead loading={true} />}>
                <ProfileHead profileData={profileData} loading={false} />
                {/* <ProfileHeadWrapper /> */}
              </Suspense>
            </div>
          </Wrapper>
        </section>
        <section className=" w-full mt-6">
          <Wrapper>
            <div className="md:px-10 xl:px-14">
              <Tabs defaultValue="profile" className="w-full !bg-transparent ">
                <TabsList className="border-b-[1px] border-b-[var(--clr-silver-v5)] !bg-transparent w-full flex items-center justify-start pb-0 gap-2 h-max">
                  <TabsTrigger
                    value="profile"
                    className="py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[3px] data-[state=active]:border-b-[var(--clr-green)] font-semibold"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="report"
                    className="py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[3px] data-[state=active]:border-b-[var(--clr-green)] font-semibold"
                  >
                    Reports
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="mt-6">
                  <Suspense
                    fallback={
                      <ProfileDetail loading={true} />
                      // [1, 2, 3, 4].map((el) => (
                      // <Skeleton
                      //   className="border-2 border-primary-/20 h-[190px] w-[200px]"
                      //   key={el}
                      // />
                      // ))
                    }
                  >
                    {/* <ProfileDetailWrapper /> */}
                    <ProfileDetail profileData={profileData} loading={false} />
                  </Suspense>
                </TabsContent>
                <TabsContent value="report" className="mt-6">
                  <Suspense fallback={<ReportDetail loading={true} />}>
                    {/* <ReportDetailWrapper /> */}
                    <ReportDetail profileData={profileData} loading={false} />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </div>
          </Wrapper>
        </section>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </TranslationsProvider>
  );
}

// export default ProfilePage;

// async function ProfileHeadWrapper() {
//   let profileData = await userProfile();

//   // await setTimeout(async function () {
//   //   profileData = await userProfile();
//   // }, 10000);
//   // const profileData: ProfileData =
//   return <ProfileHead profileData={profileData} loading={true} />;
// }

// async function ProfileDetailWrapper() {
//   let profileData;
//   await setTimeout(async function () {
//     profileData = await userProfile();
//   }, 1000);
//   // const profileData: ProfileData = await userProfile();
//   return <ProfileDetail profileData={profileData!} />;
// }

// async function ReportDetailWrapper() {
//   let profileData;
//   await setTimeout(async function () {
//     profileData = await userProfile();
//   }, 1000);
//   // const profileData: ProfileData = await userProfile();
//   return <ReportDetail profileData={profileData!} />;
// }
