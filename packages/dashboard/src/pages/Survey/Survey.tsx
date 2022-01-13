import * as React from 'react';

import {Button, Drawer} from '@feedback/design-system';

import { FeedbackCard } from '../../components/FeedbackCard';
import { FeedbackDeleteForm } from '../../components/FeedbackDeleteForm';
import { FeedbackPutForm } from '../../components/FeedbackPutForm';
import {IFeedbackSurvey} from '@feedback/common';
import { httpClient } from '../../helpers/httpClient';

function Survey() {
  const [survey, setSurvey] = React.useState<null|'create'|'update'|'delete'>(null);
  const [surveys, setSurveys] = React.useState<Array<IFeedbackSurvey>>([]);
  const [activeSurvey, setActiveSurvey] = React.useState<IFeedbackSurvey|null>(null);

  React.useEffect(() => {
    httpClient.get('/1234-1234-1234-1234/survey')
      .then(({data}) => {
        setSurveys(data);
      });
  }, []);

  const setDrawerData = (type: 'create'|'update'|'delete'|null, survey: any) => {
    if (type === null) {
      return setSurvey(null);
    }
    setActiveSurvey(survey)
    setSurvey(type);
  };

  const surveysMap = surveys.map(survey => <FeedbackCard key={survey.surveyId} survey={survey} onClick={(type) => setDrawerData(type, survey)} />);

  return (
    <React.Fragment>
      <Drawer open={survey !== null} onClose={() => setSurvey(null)}>
        <React.Fragment>
          {survey === 'create' && <FeedbackPutForm buttonText="Create survey" onClose={() => setDrawerData(null, null)} />}
          {survey === 'update' && <FeedbackPutForm buttonText="Update survey" feedbackTitle={activeSurvey?.name} feedbackUrl={activeSurvey?.url} feedbackId={activeSurvey?.surveyId} onClose={() => setDrawerData(null, null)} />}
          {survey === 'delete' && <FeedbackDeleteForm feedbackTitle={activeSurvey?.name||''} feedbackId={activeSurvey?.surveyId||''} onClose={() => setDrawerData(null, null)} />}
        </React.Fragment>
      </Drawer>
      <div className="pt-6 pl-6">
        <Button variant="outline" onClick={() => setSurvey('create')}>Create new survey</Button>
      </div>
      <div className="mt-6 px-3 flex flex-wrap">
        {surveysMap}
      </div>
    </React.Fragment>
  )
}

export { Survey };
