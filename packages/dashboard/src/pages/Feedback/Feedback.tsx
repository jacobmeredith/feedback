import * as React from 'react';

import {Button, Drawer} from '@feedback/design-system';
import { FeedbackCreateForm } from '../../components/FeedbackCreateForm';

function Feedback() {
  const [drawer, setDrawer] = React.useState<null|'create'|'update'|'delete'>(null);

  return (
    <React.Fragment>
      <Button type="secondary" onClick={() => setDrawer('create')}>Create new survey</Button>
      <Drawer open={drawer !== null} onClose={() => setDrawer(null)}>
        <React.Fragment>
          {drawer === 'create' && <FeedbackCreateForm />}
          {drawer === 'update' && <div>Update form</div>}
          {drawer === 'delete' && <div>Delete form</div>}
        </React.Fragment>
      </Drawer>
    </React.Fragment>
  )
}

export { Feedback };
