import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LabTexture } from "@/components/LabTexture";

export const metadata: Metadata = {
  title: "Política de Privacidade | Dermaflora Farmácia de Manipulação",
  description:
    "Como a Dermaflora Farmácia Dermatológica coleta, usa e protege os dados pessoais de quem acessa o site.",
  alternates: { canonical: "/politica-de-privacidade" },
};

// Conteúdo recuperado do site antigo (dermaflora.com.br/politica-de-privacidade,
// via Wayback Machine) — o Google ainda indexa essa URL como sitelink e o site
// novo não tinha nenhuma página nesse endereço. Revisar periodicamente com o
// jurídico da empresa; este texto é o ponto de partida, não a versão final.
export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <Header />
      <main className="relative isolate overflow-hidden">
        <LabTexture className="-z-10" />
        <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            Política de Privacidade
          </h1>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-df-ink-700">
            <p>
              <strong className="text-df-ink-900">CONTROLADOR:</strong>{" "}
              DERMAFLORA FARMÁCIA DERMATOLÓGICA LTDA – EPP, pessoa jurídica de
              direito privado inscrita no CNPJ/MF 45.680.634/0001-70, com sede
              na Rua Manoel da Nóbrega, 1.162, bairro Paraíso, município de
              São Paulo, Estado de São Paulo, CEP: 04.001-003.
            </p>

            <p>
              Ao acessar o sítio eletrônico da Dermaflora Farmácia
              Dermatológica você compartilha inúmeras informações conosco.
              Trata-se de um importante instrumento para que nossos serviços
              sejam continuamente aprimorados e você tenha uma experiência
              personalizada.
            </p>

            <p>
              Faz-se necessário informar que a nossa política de privacidade
              poderá ser alterada, razão pela qual é importante que você
              consulte nossa política regularmente e, caso não concorde com
              eventuais alterações promovidas, entre em contato com nosso
              canal de relacionamento através do e-mail:{" "}
              <a
                href="mailto:contato@dermaflora.com.br"
                className="text-df-primary-700 underline underline-offset-2"
              >
                contato@dermaflora.com.br
              </a>
              .
            </p>

            <div>
              <h2 className="font-display text-xl font-bold text-df-ink-900">
                1 – Quais são as informações que compartilho com a Dermaflora?
              </h2>
              <p className="mt-3">
                Ao navegar no sítio eletrônico da Dermaflora Farmácia
                Dermatológica sem desabilitar cookies ou sem optar pela
                navegação anônima, você compartilha conosco o seu histórico
                de acessos, sua localização geográfica, o sistema operacional
                que utiliza, o seu tempo de navegação, o seu endereço de IP,
                dentre outras informações, sendo este armazenamento realizado
                por meio de tecnologias de coleta de informações, tais como
                cookies e identificadores anônimos. A ferramenta utilizada
                para a análise dos dados é o Google Analytics.
              </p>
              <p className="mt-3">
                Os seus dados financeiros informados quando da aquisição de
                algum de nossos produtos são compartilhados com nossos
                provedores de serviços de pagamento, que mantêm rígidos
                controles para que suas informações sejam protegidas.
              </p>
              <p className="mt-3">
                Por conseguinte, ao acessar as páginas da Dermaflora sem
                desabilitar tais tecnologias, você expressamente autoriza o
                armazenamento de informações através de referidas
                tecnologias.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-df-ink-900">
                2 – Como a Dermaflora utiliza as informações que compartilho?
              </h2>
              <p className="mt-3">
                Armazenamos tais dados para oferecer uma experiência
                personalizada para que você possa desfrutar o melhor de
                nossos serviços e atendermos as exigências legais para
                produção de seu medicamento de forma segura e profissional.
              </p>
              <p className="mt-3">
                A Dermaflora não comercializa as informações coletadas,
                apenas as compartilha com prestadores de serviços, parceiros
                comerciais, outras empresas do nosso grupo e autoridades
                públicas, caso haja o dever legal para tanto.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-df-ink-900">
                3 – Publicidade e cookies
              </h2>
              <p className="mt-3">
                Para sua ciência, podemos definir o termo &ldquo;cookie&rdquo;
                como sendo um arquivo que contêm um identificador (sequência
                de letras e números) proveniente de um servidor da web e
                enviado a um navegador da web, sendo por este armazenado.
              </p>
              <p className="mt-3">
                Eles são responsáveis por coletar e armazenar informações
                sobre a navegação dentro desse ambiente, permitindo que elas
                sejam usadas posteriormente.
              </p>
              <p className="mt-3">
                Podemos usar &ldquo;cookies&rdquo; para conhecer seus
                interesses, as páginas que você navegou, seus padrões de
                tráfego e seu comportamento. Assim, podemos oferecer um
                serviço melhor e também conteúdo e publicidade que sejam do
                seu interesse.
              </p>
              <p className="mt-3">
                Você pode desativar cookies a qualquer momento ou cancelar a
                inscrição para receber nossos e-mails promocionais. Porém, ao
                desativar essas tecnologias, talvez você não consiga usar e
                aproveitar todos os recursos que oferecemos. O procedimento
                para desativar é diferente para cada navegador; você
                precisará fazer isso em cada um dos que usa (Google Chrome,
                Mozilla Firefox, Safari, Internet Explorer, Microsoft Edge,
                Opera).
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-df-ink-900">
                4 – São direitos dos usuários
              </h2>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Confirmação da existência de tratamento;</li>
                <li>Acesso aos dados;</li>
                <li>
                  Correção de dados incompletos, inexatos ou desatualizados;
                </li>
                <li>
                  Anonimização, bloqueio ou eliminação de dados
                  desnecessários;
                </li>
                <li>
                  Portabilidade dos dados a outro fornecedor de serviço ou
                  produto, mediante requisição expressa;
                </li>
                <li>Eliminação dos dados pessoais tratados;</li>
                <li>
                  Informação das entidades públicas e privadas com as quais o
                  controlador realizou uso compartilhado de dados;
                </li>
                <li>Revogação do consentimento.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-df-ink-900">
                5 – Proteção de dados sensíveis
              </h2>
              <p className="mt-3">
                A Dermaflora está em conformidade com os regulamentos e
                padrões do setor em relação às medidas de segurança
                aplicáveis às suas informações pessoais.
              </p>
              <p className="mt-3">
                A privacidade online requer trabalho conjunto entre empresas
                e usuários. Adotamos rígidas medidas de segurança para
                proteger suas informações, no entanto, precisamos, também,
                que você colabore e adote medidas de proteção à sua
                privacidade.
              </p>
              <p className="mt-3">
                Em razão da própria atividade que desenvolvemos, a Dermaflora
                coleta seus dados pessoais, bem como dados inerentes à sua
                privacidade e intimidade (receitas e tratamentos médicos) e
                os armazena com o fim de cumprir determinações legais
                solicitadas pelos órgãos de fiscalização sanitária. O
                armazenamento do histórico receituário de cada cliente é
                utilizado para auxiliá-los em seus respectivos tratamentos e
                obtenção de medicamentos que requerem o seu uso contínuo.
              </p>
              <p className="mt-3">
                Armazenamos as informações por um prazo indeterminado em
                razão da obrigatoriedade de cumprirmos as regulamentações
                sanitárias. Tais regulamentações exigem a retenção das
                receitas e informações pertinentes a cada medicamento
                solicitado, nos termos exigidos pelos órgãos competentes
                (ANVISA, COVISA, MAPA, Polícia Civil e Polícia Federal).
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-df-ink-900">
                6 – Como requerer o acesso aos meus dados coletados ou
                requerer a sua modificação ou exclusão?
              </h2>
              <p className="mt-3">
                Para requerer o acesso aos dados cadastrados, alteração ou
                exclusão, será necessária uma solicitação via e-mail para{" "}
                <a
                  href="mailto:contato@dermaflora.com.br"
                  className="text-df-primary-700 underline underline-offset-2"
                >
                  contato@dermaflora.com.br
                </a>
                , onde serão exigidas informações para uma pré-identificação
                dos solicitantes, para garantir a autenticidade e a segurança
                nos procedimentos, podendo ser solicitados documentos e
                validações via celular informado no cadastro do cliente.
              </p>
              <p className="mt-3">
                Por dever legal, teremos que armazenar suas informações pelos
                períodos legalmente exigidos pelas autoridades sanitárias.
                Após referidos períodos legais, excluiremos suas informações
                de nosso banco de dados.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
