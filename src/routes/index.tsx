import { createFileRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { ArrowRight, BookOpen, Check, Download, GraduationCap, Heart, Layers, LockKeyhole, Pencil, Plus, Printer, Puzzle, ShieldCheck, Sparkles, SpellCheck, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { defaultOffer, GUARANTEE_DAYS } from '@/features/sales/offer';
import { trackCheckoutClick, type Pixel } from '@/features/sales/tracking';
import heroAsset from '@/assets/literacy-kit-mockup.jpg.asset.json';
import contentAsset from '@/assets/literacy-kit-content.jpg.asset.json';
import alphabetIllustration from '@/assets/learning-alphabet.jpg';
import syllablesIllustration from '@/assets/learning-syllables.jpg';
import readingIllustration from '@/assets/learning-reading.jpg';
import writingIllustration from '@/assets/learning-writing.jpg';
const heroImage = heroAsset.url;
import { ActivityCarousel } from '@/features/sales/ActivityCarousel';
import { activityPages } from '@/features/sales/activity-pages';
const hasRealActivityPages = activityPages.some(page => !page.isPlaceholder);

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
     { title: `Kit Prático de Alfabetização | Kit Essencial por R$ ${defaultOffer.essentialPrice}` },
     { name: 'description', content: `Atividades de letras, sílabas, leitura e escrita, com quatro complementos incluídos. Kit digital para imprimir por R$ ${defaultOffer.essentialPrice}, pagamento único e 7 dias de garantia.` },
     { property: 'og:title', content: 'Kit Prático de Alfabetização — Escolha, imprima e pratique' },
     { property: 'og:description', content: `Kit Essencial com atividades organizadas por habilidade e quatro complementos. Material digital por R$ ${defaultOffer.essentialPrice}, sem mensalidade.` },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], scripts: [{ children: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','1504602178383511');
fbq('track','PageView');` }] }),
  component: SalesPage,
});

const skills = [
  { icon: SpellCheck, title: 'Letras', text: 'Para praticar o reconhecimento e a identificação das letras antes de formar palavras.' },
  { icon: Volume2, title: 'Maiúsculas e minúsculas', text: 'Para reconhecer diferentes formas de escrever uma letra e relacionar maiúsculas e minúsculas.' },
  { icon: Puzzle, title: 'Sílabas', text: 'Para praticar o reconhecimento e a associação de sílabas na formação de palavras.' },
  { icon: Layers, title: 'Palavras', text: 'Atividades de associação entre imagens e palavras, relacionando letras e sílabas.' },
  { icon: BookOpen, title: 'Leitura', text: 'Para continuar a prática da leitura quando a criança já consegue trabalhar com palavras.' },
  { icon: Pencil, title: 'Escrita', text: 'Exercícios para praticar a escrita, escolhidos conforme o que a criança precisa trabalhar.' },
];
const benefits = [
  { icon: Layers, title: 'Atividades por habilidade', text: 'Encontre propostas para trabalhar letras, sílabas, palavras, leitura e escrita.' },
  { icon: GraduationCap, title: 'Apoio para educadores', text: 'Use como recurso complementar no planejamento e nas atividades pedagógicas.' },
  { icon: Printer, title: 'Pronto para imprimir', text: 'Escolha as páginas que fazem sentido para a atividade e imprima quando precisar.' },
  { icon: Heart, title: 'Acompanhe cada etapa', text: 'Selecione atividades de acordo com o que a criança está praticando.' },
  { icon: BookOpen, title: 'Opções de leitura', text: 'Inclui atividades e um caderno complementar para praticar a leitura.' },
  { icon: Pencil, title: 'Prática da escrita', text: 'Conte com exercícios de escrita entre as opções disponíveis no kit.' },
  { icon: Puzzle, title: 'Mais prática com sílabas', text: 'Use atividades extras para trabalhar o reconhecimento e a formação de sílabas.' },
  { icon: Check, title: 'Materiais reunidos', text: 'Kit principal e quatro complementos incluídos em uma única compra.' },
];
const learningCards = [
  { title: 'Letras do alfabeto', image: alphabetIllustration, alt: 'Ilustração de letras maiúsculas e minúsculas, uma criança e uma abelha', items: ['Reconhecer as letras.', 'Identificar letras maiúsculas e minúsculas.', 'Associar letras aos seus sons e imagens.'] },
  { title: 'Vogais e sílabas', image: syllablesIllustration, alt: 'Ilustração das vogais, sílabas BA, BE e BI e uma banana com letras para completar', items: ['Reconhecer as vogais.', 'Completar palavras com letras que faltam.', 'Começar a identificar e formar sílabas simples.'] },
  { title: 'Primeiras palavras e leitura', image: readingIllustration, alt: 'Ilustração de uma bola, uma casa e um gato associados às palavras correspondentes', items: ['Associar imagens às palavras correspondentes.', 'Reconhecer palavras simples.', 'Praticar a leitura de palavras familiares.'] },
  { title: 'Escrita e coordenação motora', image: writingIllustration, alt: 'Ilustração de uma criança praticando o traçado das letras e linhas pontilhadas com um lápis', items: ['Treinar o traçado das letras.', 'Completar palavras com letras ausentes.', 'Praticar a escrita inicial por meio de atividades guiadas.'] },
];
const faqs = [
  ['O que está incluído no Kit Essencial?', 'Atividades de reconhecimento de letras, maiúsculas e minúsculas, associação entre letras e imagens, sílabas, leitura e escrita, além do Caderno de leitura, Atividades extras de sílabas, Caderno de escrita e Material de revisão.'],
  ['O kit é adequado à etapa de aprendizagem da criança?', 'O kit reúne atividades de diferentes habilidades da alfabetização. Escolha conforme o que a criança já consegue fazer: reconhecimento de letras, sílabas, palavras, leitura ou escrita. Um adulto acompanha a prática. O material é um apoio pedagógico, não um curso nem uma garantia de alfabetização.'],
  ['O Kit Essencial é indicado para educadores?', 'Sim. O Kit Essencial foi pensado para educadores como material de apoio pedagógico, com atividades que podem ser escolhidas conforme a habilidade trabalhada. Pais e responsáveis também podem usar o material em casa, acompanhando a prática da criança. Ele não substitui o acompanhamento escolar.'],
    ['Como recebo o material após a compra?', 'Após a confirmação do pagamento, o material digital é enviado para o e-mail informado na compra. Confira também as pastas de spam e lixo eletrônico. Nenhum material físico é enviado.'],
  ['Preciso imprimir todas as páginas do kit?', 'Não. Selecione as páginas que pretende usar e imprima somente o necessário. A impressão não está incluída no preço do kit e fica por sua conta.'],
  ['Qual é a diferença entre o kit e atividades gratuitas?', 'Atividades gratuitas também podem ser úteis. A proposta deste kit é reunir atividades de diferentes habilidades e quatro materiais complementares em um mesmo conjunto, para você escolher o que usar sem reunir arquivos de várias fontes. A compra faz sentido se essa organização for útil à sua rotina.'],
  ['O pagamento é feito uma única vez?', `Sim. O Kit Essencial custa R$ ${defaultOffer.essentialPrice}, com todos os materiais apresentados incluídos e sem mensalidade. As formas de pagamento são apresentadas no checkout.`],
  ['Como funciona o prazo de garantia e o reembolso?', `Você tem ${GUARANTEE_DAYS} dias para conhecer o material e solicitar reembolso se ele não atender à sua necessidade, conforme as condições da compra.`],
];
const mainItems = ['Atividades de letras', 'Letras maiúsculas e minúsculas', 'Atividades de sílabas', 'Formação de palavras', 'Atividades de leitura', 'Atividades de escrita', 'Atividades ilustradas', 'Exercícios de associação', 'Materiais organizados por etapa', 'Arquivos digitais prontos para imprimir'];
function Logo() {
  return <a href="#inicio" className="logo" aria-label="Kit Prático de Alfabetização, início"><span className="logo-icon"><BookOpen /></span><span><span className="logo-name">Kit de Alfabetização<span className="text-primary">.</span></span><span className="logo-caption">Aprender, uma etapa de cada vez.</span></span></a>;
}
function CTA({ children = 'Quero o Kit Essencial', className = '', outline = false }: { children?: ReactNode; className?: string; outline?: boolean }) {
  return <Button variant={outline ? 'salesOutline' : 'sales'} asChild className={className}><a href={defaultOffer.essentialLink} onClick={() => {
    trackCheckoutClick((window as Window & { fbq?: Pixel }).fbq);
  }}>{children}<ArrowRight /></a></Button>;
}
function Heading({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return <div className="section-heading"><div className="eyebrow">{label}</div><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}
function CheckList({ items }: { items: string[] }) {
  return <ul className="check-list">{items.map(item => <li key={item}><Check />{item}</li>)}</ul>;
}
function TrustLine() {
  return <div className="trust-line"><span><LockKeyhole />Pagamento seguro</span><span><Download />Acesso digital</span><span><ShieldCheck />{GUARANTEE_DAYS} dias de garantia</span></div>;
}

function SalesPage() {
  const offer = defaultOffer;
  return <>
    <noscript><img height="1" width="1" hidden src="https://www.facebook.com/tr?id=1504602178383511&ev=PageView&noscript=1" alt="" /></noscript>
    <div id="inicio" className="top-note">Atividades de alfabetização para praticar em casa</div>
    <main>
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="eyebrow"><Sparkles />Para educadores e famílias</div>
<h1>Kit Prático de Alfabetização<span>Ajude seu filho a aprender a ler e escrever com atividades prontas para imprimir!</span></h1>
          <p className="hero-copy">Um kit com atividades organizadas por etapa, para praticar letras, sílabas, leitura e escrita em casa.</p>
          <figure className="hero-product"><img className="hero-image" src={heroImage} alt="Mockup ilustrativo do Kit Prático de Alfabetização e dos cadernos de leitura e escrita" width={1024} height={1024} fetchPriority="high" /></figure>
          
          <p className="hero-offer">Kit digital por <strong>R$ {offer.essentialPrice}</strong></p>
          <CTA>Quero o Kit Essencial</CTA>
          <TrustLine />
        </div>
      </section>
      <div className="benefit-strip"><div className="wrap strip-inner">{[{ icon: Printer, text: 'Pronto para imprimir' }, { icon: Layers, text: 'Organizado por etapa' }, { icon: Heart, text: 'Em casa ou na escola' }, { icon: ShieldCheck, text: '7 dias de garantia' }].map(({ icon: Icon, text }) => <div className="strip-item" key={text}><Icon />{text}</div>)}</div></div>
            <section className="section section-muted" id="beneficios"><div className="wrap"><Heading label="Benefícios" title="Um apoio prático para educadores">O Kit Essencial reúne atividades e materiais complementares para apoiar o trabalho pedagógico. Escolha o que usar conforme a habilidade que está sendo trabalhada.</Heading><div className="benefits-grid">{benefits.map(({ icon: Icon, title, text }) => <article className="benefit-card" key={title}><span className="benefit-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section"><div className="wrap"><Heading label="Apoio à aprendizagem em casa" title="O que a criança precisa praticar agora?">Reconhecer uma letra, relacionar uma imagem à palavra ou tentar escrever: cada momento pede uma atividade diferente. O kit reúne opções para você escolher conforme o que a criança já consegue fazer.</Heading><div className="steps-grid">{[{ title: 'Reconhecer', text: 'Escolha atividades de letras quando a criança ainda está conhecendo o alfabeto.' }, { title: 'Relacionar', text: 'Trabalhe associações entre letras, imagens e palavras.' }, { title: 'Ler', text: 'Selecione sílabas e leitura conforme a prática que ela precisa.' }, { title: 'Escrever', text: 'Acompanhe os exercícios de escrita, respeitando o ritmo da criança.' }].map(({ title, text }, i) => <div className="step" key={title}><span className="step-num">{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>
      <section className="section section-muted" id="conteudo"><div className="wrap"><Heading label="Cada habilidade, seu próximo passo" title="O que cada atividade ajuda a praticar">Do reconhecimento das letras à prática da leitura e da escrita: escolha a habilidade que faz sentido para a criança.</Heading>{hasRealActivityPages && <ActivityCarousel />}<div className="skills-grid">{skills.map(({ icon: Icon, title, text }, i) => <article className="skill" key={title}><span className="skill-number">0{i + 1}</span><span className="skill-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="center-cta"><CTA>Comprar o Kit Essencial</CTA></div></div></section>
      
      
      <section className="section section-muted learning-section" id="bonus">
        <div className="wrap">
          <Heading label="Primeiras habilidades da alfabetização" title="O que a criança vai aprender com o kit?">Atividades práticas para desenvolver as primeiras habilidades de leitura e escrita, no ritmo da criança.</Heading>
          <div className="learning-grid">
            {learningCards.map(({ title, image, alt, items }, index) => <article className="learning-card" key={title}>
              <img className="learning-image" src={image} alt={alt} width={1024} height={1024} loading="lazy" />
              <div className="learning-content">
                <span className="learning-number" aria-hidden="true">0{index + 1}</span>
                <h3>{title}</h3>
                <ul>{items.map(item => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}</ul>
              </div>
            </article>)}
          </div>
          <p className="learning-caption">Ilustrações das habilidades trabalhadas; não são reproduções das páginas do kit.</p>
        </div>
      </section>

      <section className="section section-muted" id="kits"><div className="wrap"><Heading label="Uma única oferta" title="Seu kit de apoio à alfabetização por R$ 10,90">Todos os materiais abaixo estão incluídos no mesmo preço, sem mensalidade.</Heading><div className="pricing-grid pricing-grid-single"><article className="price-card price-card-complete"><div className="complete-label"><BookOpen />UMA COMPRA · TODOS OS MATERIAIS INCLUÍDOS</div><h3>Kit Essencial</h3><p className="price-subtitle">ESCOLHA AS PÁGINAS QUE PRECISA USAR</p><CheckList items={['Reconhecimento de letras maiúsculas e minúsculas', 'Vogais e formação de sílabas simples', 'Associação entre imagens e palavras', 'Leitura de palavras familiares', 'Traçado das letras e coordenação motora', 'Escrita inicial com atividades guiadas', 'Arquivos digitais prontos para imprimir']} /><div className="price-value"><span>R$</span>{offer.essentialPrice}</div><p className="price-payment">Preço total · Pagamento único · Sem mensalidade</p><CTA>Comprar o Kit Essencial</CTA><p className="price-card-note">Você será direcionado ao checkout da Cakto.<br />Confira as formas de pagamento e as instruções de acesso antes de concluir.</p><p className="price-card-note">Material digital · Impressão por sua conta<br />{GUARANTEE_DAYS} dias de garantia</p></article></div><div className="center-cta"><TrustLine /></div></div></section>
      <section className="section"><div className="wrap guarantee"><div className="guarantee-seal"><ShieldCheck /><strong>{GUARANTEE_DAYS}</strong><span>DIAS DE GARANTIA</span></div><div><div className="eyebrow">Tempo para avaliar o material</div><h2>Você tem {GUARANTEE_DAYS} dias para conhecer</h2><p>Acesse o material e avalie se as atividades atendem à sua necessidade. Se não atenderem, você pode solicitar reembolso dentro do prazo de {GUARANTEE_DAYS} dias, seguindo as condições e orientações da compra.</p><CTA outline>Quero o Kit Essencial</CTA></div></div></section>
      <section className="section section-muted" id="duvidas"><div className="wrap"><Heading label="Tudo claro antes de escolher" title="Perguntas frequentes" /><div className="faq-list">{faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<Plus /></summary><p>{answer}</p></details>)}</div></div></section>
      <section className="final-offer"><div className="wrap"><div className="eyebrow"><Sparkles />Para sua próxima atividade</div><h2>Kit Essencial por R$ {offer.essentialPrice}</h2><p>Tenha atividades para acompanhar a criança em casa: escolha a habilidade que precisa praticar, imprima as páginas e participe desse momento de aprendizagem.</p><span className="small-label">MATERIAL DIGITAL · PAGAMENTO ÚNICO · SEM MENSALIDADE</span><CTA>Comprar o Kit Essencial</CTA><TrustLine /></div></section>
    </main>
    <footer className="footer"><div className="wrap footer-inner"><Logo /><p>Material digital destinado ao apoio pedagógico e à alfabetização infantil.<br />As imagens dos materiais são ilustrativas.</p></div></footer>
    <div className="mobile-cta"><span>Kit Essencial · R$ {offer.essentialPrice}<small>Digital · {GUARANTEE_DAYS} dias de garantia</small></span><CTA>Comprar</CTA></div>
  </>;
}
