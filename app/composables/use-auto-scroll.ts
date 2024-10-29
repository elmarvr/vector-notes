export function useAutoScroll(el: Ref<HTMLElement | null>) {
  const { arrivedState, y } = useScroll(el, {
    offset: {
      bottom: 1,
    },
    behavior: "smooth",
  });

  useMutationObserver(
    el,
    () => {
      if (!arrivedState.bottom || !el.value) {
        return;
      }

      y.value = el.value.scrollHeight;
    },
    {
      childList: true,
      subtree: true,
      characterData: true,
    }
  );
}
