import { createHooks } from "./hooks";
import { createElement, render as updateElement } from "./render";

function MyReact() {
  let root;
  let prevDOM;
  let jsx;

  const _render = () => {
    resetHookContext();
    const currentDOM = jsx();

    updateElement(root, currentDOM, prevDOM);
    prevDOM = currentDOM;
  };

  function render($root, rootComponent) {
    resetHookContext();

    root = $root;
    // 렌더링 하는 순간 바로 이전 DOM이 됨.
    prevDOM = rootComponent();
    jsx = rootComponent;

    updateElement($root, prevDOM);
  }

  const {
    useState,
    useMemo,
    resetContext: resetHookContext,
  } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
