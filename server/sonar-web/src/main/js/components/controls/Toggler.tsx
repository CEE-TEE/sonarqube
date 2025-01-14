/*
 * SonarQube
 * Copyright (C) 2009-2022 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import DocumentClickHandler from './DocumentClickHandler';
import EscKeydownHandler from './EscKeydownHandler';
import FocusOutHandler from './FocusOutHandler';
import OutsideClickHandler from './OutsideClickHandler';

interface Props {
  children?: React.ReactNode;
  closeOnClick?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  closeOnFocusOut?: boolean;
  onRequestClose: () => void;
  open: boolean;
  overlay: React.ReactNode;
}

export default class Toggler extends React.Component<Props> {
  renderOverlay() {
    const {
      closeOnClick = false,
      closeOnClickOutside = true,
      closeOnEscape = true,
      closeOnFocusOut = true,
      onRequestClose,
      overlay
    } = this.props;

    let renderedOverlay = overlay;

    if (closeOnFocusOut) {
      renderedOverlay = (
        <FocusOutHandler onFocusOut={onRequestClose}>{renderedOverlay}</FocusOutHandler>
      );
    }

    if (closeOnEscape) {
      renderedOverlay = (
        <EscKeydownHandler onKeydown={onRequestClose}>{renderedOverlay}</EscKeydownHandler>
      );
    }

    if (closeOnClick) {
      return (
        <DocumentClickHandler onClick={onRequestClose}>{renderedOverlay}</DocumentClickHandler>
      );
    } else if (closeOnClickOutside) {
      return (
        <OutsideClickHandler onClickOutside={onRequestClose}>{renderedOverlay}</OutsideClickHandler>
      );
    }
    return renderedOverlay;
  }

  render() {
    return (
      <>
        {this.props.children}
        {this.props.open && this.renderOverlay()}
      </>
    );
  }
}
