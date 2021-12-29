import * as React from 'react';

import {Button, Card, Drawer} from '@feedback/design-system';
import { FeedbackCreateForm } from '../../components/FeedbackCreateForm';
import { httpClient } from '../../helpers/httpClient';

function Feedback() {
  const [drawer, setDrawer] = React.useState<null|'create'|'update'|'delete'>(null);
  const [surveys, setSurveys] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    httpClient.get('/feedback/1')
      .then(({data}) => {
        setSurveys(data);
      });
  }, []);

  const surveysMap = surveys.map(survey => (
    <div className="mb-4">
      <Card key={survey.type}>
        <h3 className="text-lg">{survey.feedbackTitle}</h3>
        <p className="mt-2">
          URL: <a className="text-blue-700 hover:underline" href={survey.feedbackUrl}>{survey.feedbackUrl}</a>
        </p>
        <div className="flex mt-4">
          <div>
            <Button type="outline" onClick={() => setDrawer('update')}>Update</Button>
          </div>
          <div className="ml-2">
            <Button type="danger" onClick={() => setDrawer('delete')}>Delete</Button>
          </div>
        </div>
      </Card>
    </div>
  ));

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
      <div className="mt-6 flex flex-col">
        {surveysMap}
      </div>
    </React.Fragment>
  )
}

export { Feedback };
