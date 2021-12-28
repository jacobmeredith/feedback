import * as React from 'react';

import {Button, Card, Drawer} from '@feedback/design-system';
import { FeedbackCreateForm } from '../../components/FeedbackCreateForm';

function Feedback() {
  const [drawer, setDrawer] = React.useState<null|'create'|'update'|'delete'>(null);

  return (
    <React.Fragment>
      <Drawer open={drawer !== null} onClose={() => setDrawer(null)}>
        <React.Fragment>
          {drawer === 'create' && <FeedbackCreateForm onClose={() => setDrawer(null)} />}
          {drawer === 'update' && <div>Update form</div>}
          {drawer === 'delete' && <div>Delete form</div>}
        </React.Fragment>
      </Drawer>
      <Button type="secondary" onClick={() => setDrawer('create')}>Create new survey</Button>
      <div className="mt-6">
        <Card>Test</Card>
      </div>
    </React.Fragment>
  )
}

export { Feedback };
