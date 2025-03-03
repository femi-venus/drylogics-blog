// src/utils/debug.ts

export const debugFragment = () => {
    // Check if any Fragment has className
    const fragments = document.querySelectorAll('*');
    fragments.forEach((element) => {
      const reactInstance = (element as any)._reactRootContainer;
      if (reactInstance) {
        const walk = (fiber: any) => {
          if (!fiber) return;
          
          // Check current fiber
          if (fiber.type?.toString().includes('Fragment') && fiber.pendingProps?.className) {
            console.warn('Found Fragment with className:', fiber);
          }
          
          // Walk child fibers
          walk(fiber.child);
          walk(fiber.sibling);
        };
        
        walk(reactInstance._internalRoot.current);
      }
    });
  };
  