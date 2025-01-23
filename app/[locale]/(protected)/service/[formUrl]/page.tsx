import { GetFormContentByUrl } from "@/actions/form";
import initTranslations from "@/app/i18n";
import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/Wrapper";
import { FormElementInstance } from "@/components/dynamicform/FormElements";
import FormSubmitComponent from "@/components/dynamicform/FormSubmitComponent";
import Navbar from "@/components/navbar/Navbar";
import TranslationsProvider from "@/components/providers/TranslationsProvider";

const i18nNamespace = ["navbar", "footer", "service"];
async function SubmitPage({
  params,
}: {
  params: {
    formUrl: string;
    locale: string;
  };
}) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespace);
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) {
    throw new Error("form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];


  return (
    <TranslationsProvider
      resources={resources}
      locale={params.locale}
      namespaces={i18nNamespace}
    >
      <Navbar locale={params.locale} />
      <div className="w-full h-full overflow-y-auto flex flex-col bg-[var(--clr-silver)]">
        <section className=" w-full mt-32 mb-16">
          <Wrapper>
            <FormSubmitComponent
              formUrl={params.formUrl}
              content={formContent}
              name={form.name}
            />
          </Wrapper>
        </section>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </TranslationsProvider>
  );
}

export default SubmitPage;
