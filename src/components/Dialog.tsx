import React from 'react';
import '@/components/dialog.scss';
import { DialogAction } from '@/types/types';
import { useDialog } from '@/utils/helpers';

const Dialog: React.FC = () => {

  const { closeDialog, dialog, isOpen } = useDialog();
  const actionHandler = (action: DialogAction) => {
    action.action();
    if (action.closeOnAction !== false) closeDialog()
  }

  if (!isOpen) return null;

  return (
    <div className="dialog-container">
        <div className="dialog">
          {dialog.title && <div className="dialog-title">{dialog.title}</div>}
          {dialog.content && <div className="dialog-content">{dialog.content}</div>}
          <div className="dialog-footer">
            {dialog.actions.map((action) => (
              <button key={action.name} className="dialog-button" onClick={() => actionHandler(action)}>
                {action.name}
              </button>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Dialog;