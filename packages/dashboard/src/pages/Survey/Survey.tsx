import * as React from 'react';

import {Button, Drawer} from '@feedback/design-system';

import {ISurvey} from '@feedback/common';
import { SurveyCard } from '../../components/SurveyCard';
import { SurveyCreateForm } from '../../components/SurveyCreateForm';
import { SurveyDeleteForm } from '../../components/SurveyDeleteForm';
import { SurveyUpdateForm } from '../../components/SurveyUpdateForm';
import { getAllSurveys } from '../../data/survey';

function Survey() {
  const [darawerType, setDrawerType] = React.useState<null|'create'|'update'|'delete'>(null);
  const [surveys, setSurveys] = React.useState<Array<ISurvey>>([]);
  const [activeSurvey, setActiveSurvey] = React.useState<ISurvey|null>(null);

  React.useEffect(() => {
    getAllSurveys('1234-1234-1234-1234')
      .then(setSurveys);
  }, []);

  const setDrawerData = (type: 'create'|'update'|'delete'|null, survey: any) => {
    if (type === null) {
      return setDrawerType(null);
    }
    setActiveSurvey(survey)
    setDrawerType(type);
  };

  const surveysMap = surveys.map(survey => <SurveyCard key={survey.surveyId} survey={survey} onClick={(type) => setDrawerData(type, survey)} />);

  return (
    <React.Fragment>
      <Drawer open={darawerType !== null} onClose={() => setDrawerType(null)}>
        <React.Fragment>
          {darawerType === 'create' && <SurveyCreateForm onClose={() => setDrawerData(null, null)} />}
          {(darawerType === 'update' && activeSurvey) && <SurveyUpdateForm survey={activeSurvey} onClose={() => setDrawerData(null, null)} />}
          {(darawerType === 'delete' && activeSurvey) && <SurveyDeleteForm survey={activeSurvey} onClose={() => setDrawerData(null, null)} />}
        </React.Fragment>
      </Drawer>
      <div className="pt-6 px-6">
        <Button variant="outline" onClick={() => setDrawerType('create')}>Create new survey</Button>
      </div>
      <div className="mt-6 px-3 flex flex-wrap">
        {surveysMap}
      </div>
    </React.Fragment>
  )
}

export { Survey };
