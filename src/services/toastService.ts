import { ToastOptions } from "@/types/types";
import { createNode, uid } from "@/utils/sharedUtils";

const toast = (message: string, options?: ToastOptions) => {
  const overlay = document.getElementById('overlays');
  if(!overlay) return;
  
  const id = uid();
  const transitionDuration = options?.transitionDuration ?? 300;
  const duration = options?.duration ?? 2000;
  
  const style = createNode('style', {});
  style.innerHTML = `
  @keyframes toggleShow {
    from {
      transform: translate(-50%, calc(.5rem));
      left: 50%;
      opacity: 0;
      min-height: 0;
      margin-bottom: 0;
    }
    to {
      transform: translate(-50%, .5rem);
      opacity: 1;
      left: 50%;
      min-height: 3rem;
      margin-bottom: 1rem;
    }
  }
  @keyframes stayaway { 0%, 100% { transform: translateY(calc(200%)); opacity: 0; } }
  .toast-${id} {
    position: fixed;
    bottom: 0;
    padding: .5rem 1rem;
    white-space: break-spaces;
    border-radius: .25rem;
    text-align: ${options?.align ?? 'center' };
    min-width:50vw;
    width: fit-content;
    margin: auto;
    overflow:hidden;
    margin-bottom: 1rem;
    background-color: var(--primary);
    display: grid;
    place-content: center;
    z-index: 2;
    animation: toggleShow ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1) 1 forwards,
      toggleShow ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${duration}ms 1 reverse,
      stayaway 100s ${duration + transitionDuration}ms;
  }
  `;

  const remove = () => {
    setTimeout(() => {
      messageEl.remove();
      containerEl.remove();
    }, transitionDuration);
  };

  const containerEl = createNode('div', { class: 'toast-' + id});
  const messageEl = createNode('div', {});
  messageEl.innerHTML = message;
  containerEl.appendChild(style);
  containerEl.appendChild(messageEl);
  overlay.appendChild(containerEl);


  setTimeout(remove, duration);
};

export default toast;