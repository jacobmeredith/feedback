import * as React from 'react';

import {Button, Drawer} from '@feedback/design-system';
import { FeedbackPutForm } from '../../components/FeedbackPutForm';
import { FeedbackDeleteForm } from '../../components/FeedbackDeleteForm';
import { httpClient } from '../../helpers/httpClient';
import { FeedbackCard } from '../../components/FeedbackCard';
import {IFeedbackSurvey} from '@feedback/common';

function Feedback() {
  const [drawer, setDrawer] = React.useState<null|'create'|'update'|'delete'>(null);
  const [surveys, setSurveys] = React.useState<Array<IFeedbackSurvey>>([]);
  const [activeSurvey, setActiveSurvey] = React.useState<IFeedbackSurvey|null>(null);

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

  const surveysMap = surveys.map(survey => <FeedbackCard key={survey.type} survey={survey} onClick={(type) => setDrawerData(type, survey)} />);

  return (
    <React.Fragment>
      <Drawer open={drawer !== null} onClose={() => setDrawer(null)}>
        <React.Fragment>
          {drawer === 'create' && <FeedbackPutForm buttonText="Create survey" onClose={() => setDrawerData(null, null)} />}
          {drawer === 'update' && <FeedbackPutForm buttonText="Update survey" feedbackTitle={activeSurvey?.feedbackTitle} feedbackUrl={activeSurvey?.feedbackUrl} feedbackId={activeSurvey?.type.split('|')[1]} onClose={() => setDrawerData(null, null)} />}
          {drawer === 'delete' && <FeedbackDeleteForm feedbackTitle={activeSurvey?.feedbackTitle||''} feedbackId={activeSurvey?.type.split('|')[1]||''} onClose={() => setDrawerData(null, null)} />}
        </React.Fragment>
      </Drawer>
      <Button type="outline" onClick={() => setDrawer('create')}>Create new survey</Button>
      <div className="mt-6 flex flex-col">
        {surveysMap}
      </div>
    </React.Fragment>
  )
}

export { Feedback };
