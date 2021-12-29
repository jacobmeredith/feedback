import * as React from 'react';

import {Button, Card, Drawer} from '@feedback/design-system';
import { FeedbackPutForm } from '../../components/FeedbackPutForm';
import { FeedbackDeleteForm } from '../../components/FeedbackDeleteForm';
import { httpClient } from '../../helpers/httpClient';

function Feedback() {
  const [drawer, setDrawer] = React.useState<null|'create'|'update'|'delete'>(null);
  const [surveys, setSurveys] = React.useState<Array<any>>([]);
  const [activeSurvey, setActiveSurvey] = React.useState<any>(null);

  React.useEffect(() => {
    httpClient.get('/feedback/1')
      .then(({data}) => {
        setSurveys(data);
      });
  }, []);

  const setDrawerData = (type: 'create'|'update'|'delete'|null, survey: any) => {
    if (type === null) {
      return setDrawer(null);
    }

    setActiveSurvey(survey)
    setDrawer(type);
  };

  const surveysMap = surveys.map(survey => (
    <div className="mb-4" key={survey.type}>
      <Card>
        <h3 className="text-lg">{survey.feedbackTitle}</h3>
        <p className="mt-2">
          URL: <a className="text-blue-700 hover:underline" href={survey.feedbackUrl}>{survey.feedbackUrl}</a>
        </p>
        <div className="flex mt-4">
          <div>
            <Button type="outline" onClick={() => setDrawerData('update', survey)}>Update</Button>
          </div>
          <div className="ml-2">
            <Button type="danger" onClick={() => setDrawerData('delete', survey)}>Delete</Button>
          </div>
        </div>
      </Card>
    </div>
  ));

  return (
    <React.Fragment>
      <Drawer open={drawer !== null} onClose={() => setDrawer(null)}>
        <React.Fragment>
          {drawer === 'create' && <FeedbackPutForm buttonText="Create survey" onClose={() => setDrawerData(null, null)} />}
          {drawer === 'update' && <FeedbackPutForm buttonText="Update survey" feedbackTitle={activeSurvey.feedbackTitle} feedbackUrl={activeSurvey.feedbackUrl} feedbackId={activeSurvey.type.split('|')[1]} onClose={() => setDrawerData(null, null)} />}
          {drawer === 'delete' && <FeedbackDeleteForm feedbackTitle={activeSurvey.feedbackTitle} feedbackId={activeSurvey.type.split('|')[1]} onClose={() => setDrawerData(null, null)} />}
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
