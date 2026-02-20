import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appDraggableTask]'
})
export class DraggableTaskDirective {
  @Input() task: any;
  @Input() tasks: any[] = [];
  @Output() reorder: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'true');
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', JSON.stringify(this.task));
    event.dataTransfer!.effectAllowed = 'move';
    this.el.nativeElement.classList.add('dragging');
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent) {
    this.el.nativeElement.classList.remove('dragging');
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
    this.el.nativeElement.classList.add('drag-over');
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    this.el.nativeElement.classList.remove('drag-over');
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.el.nativeElement.classList.remove('drag-over');
    const draggedTask = JSON.parse(event.dataTransfer?.getData('text/plain') || '{}');
    const fromIndex = this.tasks.findIndex(t => t.id === draggedTask.id);
    const toIndex = this.tasks.findIndex(t => t.id === this.task.id);
    if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
      const updatedTasks = [...this.tasks];
      const [movedTask] = updatedTasks.splice(fromIndex, 1);
      updatedTasks.splice(toIndex, 0, movedTask);
      this.reorder.emit(updatedTasks);
    }
  }
}
