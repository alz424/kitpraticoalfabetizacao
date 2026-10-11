import { createFileRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { ArrowRight, BookOpen, Check, Download, Gift, GraduationCap, Heart, Layers, LockKeyhole, Pencil, Plus, Printer, Puzzle, RefreshCw, ShieldCheck, Sparkles, SpellCheck, Users, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { defaultOffer, GUARANTEE_DAYS } from '@/features/sales/offer';
import heroAsset from '@/assets/literacy-kit-mockup.jpg.asset.json';
import contentAsset from '@/assets/literacy-kit-content.jpg.asset.json';
import readingAsset from '@/assets/caderno-de-leitura.jpg.asset.json';
import syllablesAsset from '@/assets/atividades-extras-silabas.jpg.asset.json';
import writingAsset from '@/assets/caderno-de-escrita.jpg.asset.json';
import revisionAsset from '@/assets/material-de-revisao.jpg.asset.json';
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
  { icon: Volume2, title: 'Sons das palavras', text: 'Exercícios de consciência fonológica para observar e trabalhar os sons presentes nas palavras.' },
  { icon: Puzzle, title: 'Sílabas', text: 'Para praticar o reconhecimento e a associação de sílabas na formação de palavras.' },
  { icon: Layers, title: 'Palavras', text: 'Atividades de associação entre imagens e palavras, relacionando letras e sílabas.' },
  { icon: BookOpen, title: 'Leitura', text: 'Para continuar a prática da leitura quando a criança já consegue trabalhar com palavras.' },
  { icon: Pencil, title: 'Escrita', text: 'Exercícios para praticar a escrita, escolhidos conforme o que a criança precisa trabalhar.' },
];
const audiences = [
  { icon: GraduationCap, title: 'Professoras', text: 'Para complementar as atividades da sala de aula sem precisar criar tudo do zero.' },
  { icon: Heart, title: 'Pais e responsáveis', text: 'Para quem quer ter atividades para continuar o aprendizado em casa.' },
  { icon: BookOpen, title: 'Reforço escolar', text: 'Para profissionais que precisam de diferentes atividades para trabalhar com seus alunos.' },
  { icon: Users, title: 'Atendimento individual', text: 'Para quem precisa selecionar atividades de acordo com o que cada criança precisa praticar.' },
];
const bonuses = [
  { title: 'Caderno de leitura', text: 'Um material complementar para continuar praticando leitura depois das atividades principais.', icon: BookOpen, key: 'bonus1' as const },
  { title: 'Atividades extras de sílabas', text: 'Mais exercícios para reforçar a formação e o reconhecimento de sílabas.', icon: Puzzle, key: 'bonus2' as const },
  { title: 'Caderno de escrita', text: 'Atividades adicionais para praticar a escrita.', icon: Pencil, key: 'bonus3' as const },
  { title: 'Material de revisão', text: 'Atividades para revisar conteúdos já trabalhados.', icon: RefreshCw, key: 'bonus4' as const },
];
const faqs = [
  ['O que vem no Kit Essencial?', 'Atividades de letras, consciência fonológica, sílabas, palavras, leitura e escrita, além do Caderno de leitura, Atividades extras de sílabas, Caderno de escrita e Material de revisão.'],
  ['Serve para a etapa em que minha criança está?', 'O kit reúne atividades de diferentes habilidades da alfabetização. Escolha conforme o que a criança já consegue fazer: reconhecimento de letras, sílabas, palavras, leitura ou escrita. Um adulto acompanha a prática. O material é um apoio pedagógico, não um curso nem uma garantia de alfabetização.'],
  ['É só para professores?', 'Não. Pode apoiar professores, profissionais de reforço escolar e responsáveis que acompanham a criança em casa.'],
  ['Como recebo o material?', 'A compra é feita no checkout da Cakto. O material é digital: as capas nas imagens são ilustrativas e nenhum livro físico é enviado. Após a confirmação do pagamento, siga as instruções de acesso da compra. Confira no checkout as condições e o prazo de disponibilização antes de pagar.'],
  ['Preciso imprimir todas as atividades?', 'Não. Selecione as páginas que pretende usar e imprima somente o necessário. A impressão não está incluída no preço do kit e fica por sua conta.'],
  ['Por que comprar se encontro atividades gratuitas?', 'Atividades gratuitas também podem ser úteis. A proposta deste kit é reunir atividades de diferentes habilidades e quatro materiais complementares em um mesmo conjunto, para você escolher o que usar sem reunir arquivos de várias fontes. A compra faz sentido se essa organização for útil à sua rotina.'],
  ['O pagamento é único?', `Sim. O Kit Essencial custa R$ ${defaultOffer.essentialPrice}, com todos os materiais apresentados incluídos e sem mensalidade. As formas de pagamento são apresentadas no checkout.`],
  ['Como funciona a garantia?', `Você tem ${GUARANTEE_DAYS} dias para conhecer o material e solicitar reembolso se ele não atender à sua necessidade, conforme as condições da compra.`],
];
const mainItems = ['Atividades de letras', 'Atividades de consciência fonológica', 'Atividades de sílabas', 'Formação de palavras', 'Atividades de leitura', 'Atividades de escrita', 'Atividades ilustradas', 'Exercícios de associação', 'Materiais organizados por etapa', 'Arquivos digitais prontos para imprimir'];
function Logo() {
  return <a href="#inicio" className="logo" aria-label="Kit Prático de Alfabetização, início"><span className="logo-icon"><BookOpen /></span><span><span className="logo-name">Kit de Alfabetização<span className="text-primary">.</span></span><span className="logo-caption">Aprender, uma etapa de cada vez.</span></span></a>;
}
function CTA({ children = 'Quero o Kit Essencial', className = '', outline = false }: { children?: ReactNode; className?: string; outline?: boolean }) {
  return <Button variant={outline ? 'salesOutline' : 'sales'} asChild className={className}><a href={defaultOffer.essentialLink}>{children}<ArrowRight /></a></Button>;
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
    <div id="inicio" className="top-note">Material digital para imprimir · Kit Essencial + 4 complementos</div>
    <main>
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="eyebrow"><Sparkles />Para famílias, professoras e reforço escolar</div>
          <h1>Kit Prático de Alfabetização<span>Escolha a habilidade. Imprima. Pratique com a criança.</span></h1>
          <p className="hero-copy">Letras, sílabas, palavras, leitura e escrita em um kit digital organizado por habilidade, com quatro complementos incluídos.</p>
          <figure className="hero-product"><img className="hero-image" src={heroImage} alt="Mockup ilustrativo do Kit Prático de Alfabetização e dos cadernos de leitura e escrita" width={1024} height={1024} fetchPriority="high" /><figcaption className="hero-caption">Imagem ilustrativa · Você recebe arquivos digitais</figcaption></figure>
          <div className="hero-points"><span><Check />Material digital</span><span><Check />Pronto para imprimir</span><span><Check />Sem mensalidade</span></div>
          <p className="hero-offer">Atividades + 4 complementos por <strong>R$ {offer.essentialPrice}</strong></p>
          <CTA>Quero o Kit Essencial</CTA>
          <TrustLine />
        </div>
      </section>
      <div className="benefit-strip"><div className="wrap strip-inner">{[{ icon: Printer, text: 'Pronto para imprimir' }, { icon: Layers, text: 'Organizado por etapa' }, { icon: Heart, text: 'Em casa ou na escola' }, { icon: ShieldCheck, text: '7 dias de garantia' }].map(({ icon: Icon, text }) => <div className="strip-item" key={text}><Icon />{text}</div>)}</div></div>
      <section className="section"><div className="wrap"><Heading label="Uma sequência que faz sentido" title="Não é só uma pasta cheia de atividades">Procurar atividades avulsas é uma opção. A conveniência deste kit é reunir exercícios por habilidade, para escolher o que trabalhar sem organizar arquivos de várias fontes:</Heading><div className="stage-track">{[{ icon: SpellCheck, title: 'LETRAS' }, { icon: Puzzle, title: 'SÍLABAS' }, { icon: Layers, title: 'PALAVRAS' }, { icon: BookOpen, title: 'LEITURA' }, { icon: Pencil, title: 'ESCRITA' }].map(({ icon: Icon, title }, i) => <div className="contents" key={title}><div className="stage"><span className="stage-icon"><Icon /></span>{title}</div>{i < 4 && <ArrowRight className="stage-arrow" />}</div>)}</div><p className="section-footnote">Você escolhe as atividades de acordo com aquilo que a criança precisa praticar naquele momento.</p></div></section>
      <section className="section section-muted" id="conteudo"><div className="wrap"><Heading label="Cada habilidade, seu próximo passo" title="O que cada atividade ajuda a praticar">Do reconhecimento das letras à prática da leitura e da escrita: escolha a habilidade que faz sentido para a criança.</Heading>{hasRealActivityPages && <ActivityCarousel />}<div className="skills-grid">{skills.map(({ icon: Icon, title, text }, i) => <article className="skill" key={title}><span className="skill-number">0{i + 1}</span><span className="skill-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="center-cta"><CTA>Comprar o Kit Essencial</CTA></div></div></section>
      <section className="section"><div className="wrap"><Heading label="Para quem acompanha o aprendizado" title="Para quem esse material foi pensado?" /><div className="audience-grid">{audiences.map(({ icon: Icon, title, text }) => <article className="audience-item" key={title}><span className="audience-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section section-tint"><div className="wrap"><Heading label="Respeite o ritmo da criança" title="E se a criança ainda estiver com dificuldade?">Você não precisa começar escolhendo uma atividade aleatória. Primeiro, observe o que ela já consegue fazer. Depois, escolha atividades que trabalhem exatamente aquela habilidade.</Heading><div className="steps-grid">{[{ title: 'Identifique', text: 'Veja o que a criança já domina.' }, { title: 'Escolha', text: 'Selecione atividades relacionadas àquela etapa.' }, { title: 'Aplique', text: 'Imprima e apresente a atividade.' }, { title: 'Avance', text: 'Conforme a criança evolui, passe para novos desafios.' }].map(({ title, text }, i) => <div className="step" key={title}><span className="step-num">{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div><p className="section-footnote"><strong>Você não precisa usar todas as atividades de uma vez.</strong></p></div></section>
      <section className="section"><div className="wrap product-layout"><img className="product-photo" src={contentAsset.url} alt="Kit Prático de Alfabetização com atividades de letras, sílabas, palavras, leitura e escrita" width={1024} height={1024} loading="lazy" /><div className="product-content"><div className="eyebrow">O que você recebe</div><h2>Kit Prático de Alfabetização</h2><span className="small-label">MATERIAL PRINCIPAL</span><CheckList items={mainItems} /></div></div></section>
      <section className="section section-muted" id="bonus"><div className="wrap"><Heading label="Mais possibilidades para praticar" title="Quatro complementos no mesmo kit" >Materiais complementares incluídos no Kit Essencial.</Heading><div className="bonus-grid">{bonuses.map(({ title, text, key }, i) => <article className="bonus" key={title}><img className="bonus-photo" src={key === 'bonus1' ? readingAsset.url : key === 'bonus2' ? syllablesAsset.url : key === 'bonus3' ? writingAsset.url : revisionAsset.url} alt={title} width={1024} height={1024} loading="lazy" /><div className="bonus-content"><span className="bonus-label">BÔNUS #{i + 1}</span><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="section section-muted" id="kits"><div className="wrap"><Heading label="Uma única oferta" title="Kit Essencial: atividades + quatro complementos">Todos os materiais abaixo estão incluídos no mesmo preço, sem mensalidade.</Heading><div className="pricing-grid pricing-grid-single"><article className="price-card price-card-complete"><div className="complete-label"><Gift />MATERIAL PRINCIPAL + TODOS OS BÔNUS</div><h3>Kit Essencial</h3><p className="price-subtitle">ESCOLHA AS PÁGINAS QUE PRECISA USAR</p><CheckList items={['Atividades de letras, sons, sílabas e palavras', 'Atividades de leitura e escrita', 'Caderno de leitura', 'Atividades extras de sílabas', 'Caderno de escrita', 'Material de revisão', 'Arquivos digitais prontos para imprimir']} /><div className="price-value"><span>R$</span>{offer.essentialPrice}</div><p className="price-payment">Preço total · Pagamento único · Sem mensalidade</p><CTA>Comprar o Kit Essencial</CTA><p className="price-card-note">Você será direcionado ao checkout da Cakto.<br />Confira as formas de pagamento e as instruções de acesso antes de concluir.</p><p className="price-card-note">Material digital · Impressão por sua conta<br />{GUARANTEE_DAYS} dias de garantia</p></article></div><div className="center-cta"><TrustLine /></div></div></section>
      <section className="section"><div className="wrap guarantee"><div className="guarantee-seal"><ShieldCheck /><strong>{GUARANTEE_DAYS}</strong><span>DIAS DE GARANTIA</span></div><div><div className="eyebrow">Tempo para avaliar o material</div><h2>Você tem {GUARANTEE_DAYS} dias para conhecer</h2><p>Acesse o material e avalie se as atividades atendem à sua necessidade. Se não atenderem, você pode solicitar reembolso dentro do prazo de {GUARANTEE_DAYS} dias, seguindo as condições e orientações da compra.</p><CTA outline>Quero o Kit Essencial</CTA></div></div></section>
      <section className="section section-muted" id="duvidas"><div className="wrap"><Heading label="Tudo claro antes de escolher" title="Perguntas frequentes" /><div className="faq-list">{faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<Plus /></summary><p>{answer}</p></details>)}</div></div></section>
      <section className="final-offer"><div className="wrap"><div className="eyebrow"><Sparkles />Para sua próxima atividade</div><h2>Kit Essencial por R$ {offer.essentialPrice}</h2><p>Reúna atividades de letras, sílabas, palavras, leitura e escrita e quatro complementos. Escolha as páginas conforme o momento da criança e acompanhe a prática.</p><span className="small-label">MATERIAL DIGITAL · PAGAMENTO ÚNICO · SEM MENSALIDADE</span><CTA>Comprar o Kit Essencial</CTA><TrustLine /></div></section>
    </main>
    <footer className="footer"><div className="wrap footer-inner"><Logo /><p>Material digital destinado ao apoio pedagógico e à alfabetização infantil.<br />As imagens dos materiais são ilustrativas.</p></div></footer>
    <div className="mobile-cta"><span>Kit Essencial · R$ {offer.essentialPrice}<small>Digital · {GUARANTEE_DAYS} dias de garantia</small></span><CTA>Comprar</CTA></div>
  </>;
}
