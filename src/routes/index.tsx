import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, BookOpen, Check, CheckCheck, Download, FileText, Gift, GraduationCap, Heart, Layers, LockKeyhole, Pencil, Plus, Printer, Puzzle, RefreshCw, Search, Settings2, ShieldCheck, Sparkles, SpellCheck, Users, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { defaultOffer, GUARANTEE_DAYS, validCheckout, type Offer } from '@/features/sales/offer';
import heroAsset from '@/assets/literacy-kit-mockup.jpg.asset.json';
import contentAsset from '@/assets/literacy-kit-content.jpg.asset.json';
import readingAsset from '@/assets/caderno-de-leitura.jpg.asset.json';
import syllablesAsset from '@/assets/atividades-extras-silabas.jpg.asset.json';
import writingAsset from '@/assets/caderno-de-escrita.jpg.asset.json';
import revisionAsset from '@/assets/material-de-revisao.jpg.asset.json';
const heroImage = heroAsset.url;
import { ActivityCarousel } from '@/features/sales/ActivityCarousel';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Kit Prático de Alfabetização | Letras, leitura e escrita' },
    { name: 'description', content: 'Atividades de alfabetização organizadas por etapa: letras, sílabas, palavras, leitura e escrita. Material digital pronto para imprimir, com 7 dias de garantia.' },
    { property: 'og:title', content: 'Kit Prático de Alfabetização — Aprender, uma etapa de cada vez' },
    { property: 'og:description', content: 'Conheça os kits de atividades para apoiar a alfabetização em casa, na escola e no reforço. Arquivos digitais organizados e prontos para imprimir.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: SalesPage,
});

const skills = [
  { icon: SpellCheck, title: 'Letras', text: 'Atividades para reconhecimento e identificação das letras.' },
  { icon: Volume2, title: 'Sons e consciência fonológica', text: 'Exercícios para trabalhar os sons presentes nas palavras.' },
  { icon: Puzzle, title: 'Sílabas', text: 'Atividades para reconhecimento, associação e formação de sílabas.' },
  { icon: Layers, title: 'Palavras', text: 'Exercícios para relacionar letras, sílabas, imagens e palavras.' },
  { icon: BookOpen, title: 'Leitura', text: 'Atividades progressivas para praticar a leitura.' },
  { icon: Pencil, title: 'Escrita', text: 'Exercícios para praticar a escrita conforme o estágio da criança.' },
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
  ['Para qual idade é indicado?', 'Para crianças em fase de alfabetização. A faixa exata deve corresponder aos níveis contemplados no material.'],
  ['É indicado somente para professores?', 'Não. O material pode ser utilizado por professores, profissionais de reforço e responsáveis que acompanham a criança em casa.'],
  ['Preciso imprimir tudo?', 'Não. Você pode imprimir somente as atividades que pretende utilizar.'],
  ['Posso usar no celular ou tablet?', 'Sim, desde que o dispositivo seja compatível com o formato dos arquivos. O material também pode ser impresso.'],
  ['É um curso?', 'Não. É um material digital de atividades para apoio à alfabetização.'],
  ['Recebo depois da compra?', 'Após a confirmação do pagamento, o acesso é disponibilizado pelo sistema de entrega.'],
  ['Preciso pagar mensalidade?', 'Não. A compra dá acesso ao material conforme as condições apresentadas na oferta.'],
  ['E se eu não gostar?', `Você terá ${GUARANTEE_DAYS} dias de garantia para solicitar o reembolso, conforme as condições da compra.`],
];
const mainItems = ['Atividades de letras', 'Atividades de consciência fonológica', 'Atividades de sílabas', 'Formação de palavras', 'Atividades de leitura', 'Atividades de escrita', 'Atividades ilustradas', 'Exercícios de associação', 'Materiais organizados por etapa', 'Arquivos digitais prontos para imprimir'];
const editorLabels: Record<Exclude<keyof Offer, 'bonus1' | 'bonus2' | 'bonus3' | 'bonus4'>, string> = {
  activities: 'Quantidade real de atividades', pages: 'Quantidade real de páginas',
  essentialAnchor: 'Preço anterior · Kit Essencial', essentialPrice: 'Preço · Kit Essencial',
  completeAnchor: 'Preço anterior · Kit Premium', completePrice: 'Preço · Kit Premium',
  essentialLink: 'Link de pagamento · Kit Essencial', completeLink: 'Link de pagamento · Kit Premium',
};

function Logo() {
  return <a href="#inicio" className="logo" aria-label="Kit Prático de Alfabetização, início"><span className="logo-icon"><BookOpen /></span><span><span className="logo-name">Kit de Alfabetização<span className="text-primary">.</span></span><span className="logo-caption">Aprender, uma etapa de cada vez.</span></span></a>;
}
function CTA({ children = 'Quero ver o material', className = '', outline = false }: { children?: ReactNode; className?: string; outline?: boolean }) {
  return <Button variant={outline ? 'salesOutline' : 'sales'} asChild className={className}><a href="#kits">{children}<ArrowRight /></a></Button>;
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
  const [offer, setOffer] = useState<Offer>(defaultOffer);
  const [editorAvailable, setEditorAvailable] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [pendingKit, setPendingKit] = useState<string | null>(null);
  useEffect(() => {
    setEditorAvailable(location.hostname === 'localhost' || location.hostname.startsWith('id-preview--'));
    try {
      const saved = sessionStorage.getItem('literacy-offer-draft');
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          const next = { ...defaultOffer };
          for (const key of Object.keys(defaultOffer) as (keyof Offer)[]) {
            const value = (parsed as Record<string, unknown>)[key];
            if (typeof value === 'string') next[key] = value;
          }
          setOffer(next);
        }
      }
    } catch { /* Preview drafts are optional. */ }
  }, []);
  function updateOffer(key: keyof Offer, value: string) {
    setOffer(current => {
      const next = { ...current, [key]: value };
      try { sessionStorage.setItem('literacy-offer-draft', JSON.stringify(next)); } catch { /* Keep the edit in memory. */ }
      return next;
    });
  }
  function buy(complete: boolean) {
    const link = complete ? offer.completeLink : offer.essentialLink;
    if (validCheckout(link)) { window.location.assign(link); return; }
    setPendingKit(complete ? 'Kit Premium' : 'Kit Essencial');
  }
  return <>
    <div id="inicio" className="top-note">Um próximo passo no aprendizado começa com a atividade certa.</div>
    <main>
      <section className="hero">
        <div className="wrap hero-inner"><div className="eyebrow"><Sparkles />Kit Prático de Alfabetização</div><h1>A criança está aprendendo a <span>ler e escrever?</span></h1><p className="hero-copy">Tenha atividades prontas e organizadas para trabalhar letras, sílabas, palavras, leitura e escrita — sem precisar procurar uma atividade diferente toda vez.</p><div className="hero-points"><span><Check />Material digital</span><span><Check />Pronto para imprimir</span><span><Check />Organizado por etapa</span></div><figure className="hero-product"><img className="hero-image" src={heroImage} alt="Ilustração do kit: atividades de letras e sílabas, lápis coloridos e blocos de alfabeto" width={1024} height={1024} fetchPriority="high" /><figcaption className="hero-caption">Imagem ilustrativa do material</figcaption></figure><CTA>Quero ver o material</CTA><TrustLine /></div>
      </section>
      <div className="benefit-strip"><div className="wrap strip-inner">{[{ icon: Printer, text: 'Pronto para imprimir' }, { icon: Layers, text: 'Organizado por etapa' }, { icon: Heart, text: 'Em casa ou na escola' }, { icon: ShieldCheck, text: '7 dias de garantia' }].map(({ icon: Icon, text }) => <div className="strip-item" key={text}><Icon />{text}</div>)}</div></div>
      <section className="section"><div className="wrap"><Heading label="Uma sequência que faz sentido" title="Não é só uma pasta cheia de atividades">Quando cada atividade é escolhida de qualquer jeito, fica difícil saber o que trabalhar primeiro. Por isso, o material foi organizado para facilitar a aplicação:</Heading><div className="stage-track">{[{ icon: SpellCheck, title: 'LETRAS' }, { icon: Puzzle, title: 'SÍLABAS' }, { icon: Layers, title: 'PALAVRAS' }, { icon: BookOpen, title: 'LEITURA' }, { icon: Pencil, title: 'ESCRITA' }].map(({ icon: Icon, title }, i) => <div className="contents" key={title}><div className="stage"><span className="stage-icon"><Icon /></span>{title}</div>{i < 4 && <ArrowRight className="stage-arrow" />}</div>)}</div><p className="section-footnote">Você escolhe as atividades de acordo com aquilo que a criança precisa praticar naquele momento.</p></div></section>
      <section className="section section-muted" id="conteudo"><div className="wrap"><Heading label="Cada habilidade, seu próximo passo" title="Veja o que você encontra dentro">Passe pelas páginas e veja alguns exemplos das atividades que fazem parte do kit.</Heading><ActivityCarousel /><div className="center-cta activity-kit-cta"><CTA>QUERO TER ACESSO AO KIT</CTA></div><div className="skills-grid">{skills.map(({ icon: Icon, title, text }, i) => <article className="skill" key={title}><span className="skill-number">0{i + 1}</span><span className="skill-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="center-cta"><CTA>Quero acessar as atividades</CTA></div></div></section>
      <section className="section"><div className="wrap"><Heading label="Para quem acompanha o aprendizado" title="Para quem esse material foi pensado?" /><div className="audience-grid">{audiences.map(({ icon: Icon, title, text }) => <article className="audience-item" key={title}><span className="audience-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section section-tint"><div className="wrap"><Heading label="Respeite o ritmo da criança" title="E se a criança ainda estiver com dificuldade?">Você não precisa começar escolhendo uma atividade aleatória. Primeiro, observe o que ela já consegue fazer. Depois, escolha atividades que trabalhem exatamente aquela habilidade.</Heading><div className="steps-grid">{[{ title: 'Identifique', text: 'Veja o que a criança já domina.' }, { title: 'Escolha', text: 'Selecione atividades relacionadas àquela etapa.' }, { title: 'Aplique', text: 'Imprima e apresente a atividade.' }, { title: 'Avance', text: 'Conforme a criança evolui, passe para novos desafios.' }].map(({ title, text }, i) => <div className="step" key={title}><span className="step-num">{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div><p className="section-footnote"><strong>Você não precisa usar todas as atividades de uma vez.</strong></p></div></section>
      <section className="section"><div className="wrap product-layout"><img className="product-photo" src={contentAsset.url} alt="Kit Prático de Alfabetização com atividades de letras, sílabas, palavras, leitura e escrita" width={1024} height={1024} loading="lazy" /><div className="product-content"><div className="eyebrow">O que você recebe</div><h2>Kit Prático de Alfabetização</h2><span className="small-label">MATERIAL PRINCIPAL</span><CheckList items={mainItems} /><div className="quantity-row"><span className="quantity">{offer.activities}</span><span className="quantity">{offer.pages}</span></div></div></div></section>
      <section className="section section-muted" id="bonus"><div className="wrap"><Heading label="Mais possibilidades para praticar" title="E ainda temos bônus" >Materiais complementares incluídos no Kit Premium.</Heading><div className="bonus-grid">{bonuses.map(({ title, text, key }, i) => <article className="bonus" key={title}><img className="bonus-photo" src={key === 'bonus1' ? readingAsset.url : key === 'bonus2' ? syllablesAsset.url : key === 'bonus3' ? writingAsset.url : revisionAsset.url} alt={title} width={1024} height={1024} loading="lazy" /><div className="bonus-content"><span className="bonus-label">BÔNUS #{i + 1}</span><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
      <section className="section"><div className="wrap"><Heading label="Menos procura. Mais tempo para ensinar." title="Por que ter tudo junto?">Porque você não precisa comprar uma atividade diferente para cada habilidade. Com o material em mãos, você pode selecionar aquilo que faz sentido para a criança, imprimir somente o necessário e voltar aos arquivos sempre que precisar.</Heading><div className="convenience-grid">{[{ icon: Printer, title: 'Pronto para imprimir', text: 'Baixe e escolha as páginas que deseja utilizar.' }, { icon: Layers, title: 'Organizado', text: 'Encontre atividades relacionadas ao que você quer trabalhar.' }, { icon: Heart, title: 'Flexível', text: 'Use em casa, na escola ou no reforço.' }, { icon: RefreshCw, title: 'Reutilizável', text: 'Tenha acesso ao material para consultar e imprimir novamente.' }].map(({ icon: Icon, title, text }) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section section-tint"><div className="wrap routine"><h2>Você não precisa ser especialista em criar atividades</h2><p>O objetivo do material é facilitar a sua rotina.<br />Em vez de abrir dezenas de sites procurando:</p><div className="search-examples">{['atividade de sílaba para imprimir', 'atividade de leitura', 'atividade de alfabetização'].map(text => <span className="search-example" key={text}><Search />“{text}”</span>)}</div><p>você terá os materiais reunidos em um único lugar.</p><strong>É abrir, escolher, imprimir e aplicar.</strong></div></section>
      <section className="section section-muted" id="kits"><div className="wrap"><Heading label="Escolha seu kit" title="O próximo passo começa aqui">Escolha o material que faz sentido para a sua rotina.</Heading><div className="pricing-grid"><article className="price-card"><h3>Kit Essencial</h3><p className="price-subtitle">PARA COMEÇAR</p><CheckList items={['Material principal', 'Atividades de alfabetização', 'Atividades organizadas por etapas', 'Arquivos digitais', 'Pronto para imprimir']} /><s className="price-anchor">R$ {offer.essentialAnchor}</s><div className="price-value"><span>R$</span>{offer.essentialPrice}</div><p className="price-payment">Material digital · Sem mensalidade</p><Button variant="salesOutline" onClick={() => buy(false)}>Quero o Kit Essencial<ArrowRight /></Button><p className="price-card-note">{GUARANTEE_DAYS} dias para conhecer o material</p></article><article className="price-card price-card-complete"><div className="complete-label"><Gift />MATERIAL PRINCIPAL + TODOS OS BÔNUS</div><h3>Kit Premium</h3><p className="price-subtitle">PARA TER TODO O MATERIAL</p><CheckList items={['Tudo do Kit Essencial', 'Caderno de leitura', 'Atividades extras', 'Material complementar de escrita', 'Material de revisão', 'Todos os bônus']} /><s className="price-anchor">R$ {offer.completeAnchor}</s><div className="price-value"><span>R$</span>{offer.completePrice}</div><p className="price-payment">Material digital · Sem mensalidade</p><Button variant="sales" onClick={() => buy(true)}>Quero o Kit Premium<ArrowRight /></Button><p className="price-card-note">Por uma pequena diferença, você recebe os materiais complementares também.</p></article></div><div className="center-cta"><TrustLine /></div></div></section>
      <section className="section"><div className="wrap guarantee"><div className="guarantee-seal"><ShieldCheck /><strong>{GUARANTEE_DAYS}</strong><span>DIAS DE GARANTIA</span></div><div><div className="eyebrow">Compra sem ficar preso à decisão</div><h2>Você tem {GUARANTEE_DAYS} dias para conhecer</h2><p>Você poderá acessar e conhecer o material dentro do período de garantia. Se perceber que ele não é adequado para sua necessidade, poderá solicitar o reembolso dentro do prazo estabelecido.</p><CTA outline>Quero conhecer o material</CTA></div></div></section>
      <section className="section section-muted" id="duvidas"><div className="wrap"><Heading label="Tudo claro antes de escolher" title="Perguntas frequentes" /><div className="faq-list">{faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<Plus /></summary><p>{answer}</p></details>)}</div></div></section>
      <section className="final-offer"><div className="wrap"><div className="eyebrow"><Sparkles />Um material. Diferentes etapas.</div><h2>Pare de procurar atividades uma por uma</h2><p>Tenha um conjunto organizado de materiais para trabalhar diferentes habilidades da alfabetização e escolha o que aplicar de acordo com a necessidade da criança.</p><span className="small-label">ACESSO DIGITAL · MATERIAL PRONTO PARA IMPRIMIR</span><Button variant="sales" onClick={() => buy(true)}>Quero o Kit Premium<ArrowRight /></Button><TrustLine /></div></section>
    </main>
    <footer className="footer"><div className="wrap footer-inner"><Logo /><p>Material digital destinado ao apoio pedagógico e à alfabetização infantil.<br />As imagens dos materiais são ilustrativas.</p></div></footer>
    <div className="mobile-cta"><span>Kit de Alfabetização<small>Pronto para imprimir · 7 dias de garantia</small></span><CTA>Ver os kits</CTA></div>
    {editorAvailable && <Button variant="outline" size="icon" className="editor-trigger" aria-label="Editar oferta" title="Editar oferta" onClick={() => setEditorOpen(true)}><Settings2 /></Button>}
    <Dialog open={editorOpen} onOpenChange={setEditorOpen}><DialogContent className="editor-content"><DialogHeader><DialogTitle>Editar sua oferta</DialogTitle><DialogDescription>Preencha os preços, as quantidades e os links reais. Estas alterações são um rascunho nesta sessão; para publicar, peça para aplicar os valores à página.</DialogDescription></DialogHeader><div className="editor-fields">{(Object.keys(editorLabels) as (keyof typeof editorLabels)[]).map(key => <label key={key} className={key.endsWith('Link') ? 'editor-wide' : ''}>{editorLabels[key]}<input type={key.endsWith('Link') ? 'url' : 'text'} value={offer[key]} placeholder={key.endsWith('Link') ? 'https://seu-link-de-pagamento.com' : undefined} onChange={event => updateOffer(key, event.target.value)} /></label>)}</div><Button variant="sales" onClick={() => setEditorOpen(false)}>Ver alterações<CheckCheck /></Button></DialogContent></Dialog>
    <Dialog open={pendingKit !== null} onOpenChange={open => { if (!open) setPendingKit(null); }}><DialogContent><DialogHeader><DialogTitle>{pendingKit}</DialogTitle><DialogDescription>O link de pagamento deste kit ainda não foi disponibilizado. A compra ficará disponível quando a oferta for finalizada.</DialogDescription></DialogHeader>{editorAvailable && <Button variant="sales" onClick={() => { setPendingKit(null); setEditorOpen(true); }}>Configurar oferta<Settings2 /></Button>}</DialogContent></Dialog>
  </>;
}
