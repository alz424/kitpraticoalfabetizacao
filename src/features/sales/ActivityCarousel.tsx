import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { activityPages } from './activity-pages';

export function ActivityCarousel() {
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: 'center', startIndex: 0 });
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const page = expanded === null ? undefined : activityPages[expanded];
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect).on('reInit', onSelect);
    return () => { api.off('select', onSelect).off('reInit', onSelect); };
  }, [api]);
  const moveExpanded = useCallback((direction: number) => {
    setExpanded(current => {
      if (current === null) return null;
      const next = (current + direction + activityPages.length) % activityPages.length;
      api?.scrollTo(next);
      return next;
    });
  }, [api]);
  useEffect(() => {
    if (expanded === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); moveExpanded(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); moveExpanded(1); }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [expanded, moveExpanded]);
  return <>
    <div className="activity-carousel" role="region" aria-roledescription="carrossel" aria-label="Páginas de atividades" onKeyDown={event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); api?.scrollPrev(); }
      if (event.key === 'ArrowRight') { event.preventDefault(); api?.scrollNext(); }
    }}>
      <div className="activity-viewport" ref={viewportRef}>
        <div className="activity-track">
          {activityPages.map((activity, index) => <div className="activity-slide" data-selected={index === selected} key={activity.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${activityPages.length}: ${activity.title}`}>
            <Button variant="ghost" className="activity-page-button" aria-label={`Ampliar atividade: ${activity.title}`} tabIndex={index === selected ? 0 : -1} onClick={() => { if (!api || api.clickAllowed()) setExpanded(index); }}>
              <img src={activity.src} width={600} height={848} alt={`${activity.isPlaceholder ? 'Modelo demonstrativo' : 'Página do kit'}: ${activity.title}`} loading="lazy" decoding="async" draggable={false} />
            </Button>
          </div>)}
        </div>
      </div>
      <div className="activity-navigation">
        <Button variant="outline" size="icon" className="activity-arrow" aria-label="Atividade anterior" title="Atividade anterior" onClick={() => api?.scrollPrev()}><ArrowLeft /></Button>
        <div className="activity-current" aria-live="polite"><strong>{activityPages[selected]?.title}</strong><span>{String(selected + 1).padStart(2, '0')} / {activityPages.length}</span></div>
        <Button variant="outline" size="icon" className="activity-arrow" aria-label="Próxima atividade" title="Próxima atividade" onClick={() => api?.scrollNext()}><ArrowRight /></Button>
      </div>
      <div className="activity-dots" aria-label="Escolher página">{activityPages.map((activity, index) => <Button key={activity.id} variant="ghost" size="icon" className="activity-dot" data-active={index === selected} aria-label={`Ver página ${index + 1}: ${activity.title}`} aria-current={index === selected ? 'true' : undefined} title={activity.title} onClick={() => api?.scrollTo(index)}><span /></Button>)}</div>
      {activityPages[selected]?.isPlaceholder && <p className="activity-disclaimer">Páginas demonstrativas — imagens finais do material a inserir.</p>}
    </div>
    <Dialog open={expanded !== null} onOpenChange={open => { if (!open) setExpanded(null); }}>
      <DialogPortal>
        <DialogOverlay className="activity-lightbox-overlay" />
        <DialogContentPrimitive page={page} move={moveExpanded} />
      </DialogPortal>
    </Dialog>
  </>;
}

// Use the primitive content to give this image viewer its own framing and close control.
import * as DialogPrimitive from '@radix-ui/react-dialog';
function DialogContentPrimitive({ page, move }: { page: typeof activityPages[number] | undefined; move: (direction: number) => void }) {
  return <DialogPrimitive.Content className="activity-lightbox">
    <div className="activity-lightbox-header"><div><DialogTitle>{page?.title}</DialogTitle><DialogDescription>{page?.isPlaceholder ? 'Página demonstrativa · imagem final a inserir' : 'Kit Prático de Alfabetização'}</DialogDescription></div><DialogClose asChild><Button variant="ghost" size="icon" aria-label="Fechar visualização" title="Fechar visualização"><X /></Button></DialogClose></div>
    <div className="activity-lightbox-body"><Button variant="ghost" size="icon" aria-label="Imagem anterior" title="Imagem anterior" onClick={() => move(-1)}><ArrowLeft /></Button>{page && <img src={page.src} alt={`${page.isPlaceholder ? 'Modelo demonstrativo' : 'Página do kit'}: ${page.title}`} width={600} height={848} />}<Button variant="ghost" size="icon" aria-label="Próxima imagem" title="Próxima imagem" onClick={() => move(1)}><ArrowRight /></Button></div>
  </DialogPrimitive.Content>;
}