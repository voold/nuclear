import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Segment, Table } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import DownloadsItem from '../DownloadsItem';

import styles from './styles.scss';

const DownloadsList = props => {
  const [sortAsc, setSort] = useState(true);
  const {
    items,
    clearFinishedTracks
  } = props;

  const { t } = useTranslation('downloads');
  return (
    <Segment inverted>
      <Button primary onClick={ clearFinishedTracks }>
        <Icon name='trash'/>
        {t('clear')}
      </Button>
      <Table inverted className={styles.downloads_list}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{t('status')}</Table.HeaderCell>
            <Table.HeaderCell onClick={() => {
                if(sortAsc){
                  items.sort((a, b) => {
                    return a.track.name.toLowerCase() > b.track.name.toLowerCase();
                  })
                  setSort(false)
                } else {
                  items.sort((a, b) => {
                    return a.track.name.toLowerCase() < b.track.name.toLowerCase();
                  })
                  setSort(true)
                }
              }
            }>{t('name')} {
                sortAsc ? <Icon name="caret up icon"></Icon> : <Icon name="caret down icon"></Icon>
              }
            </Table.HeaderCell>
            <Table.HeaderCell>{t('completion')}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            items.map(item => {
              return (
                <DownloadsItem
                  key={ item.track.uuid }
                  item={ item }
                />
              );
            })
          }
        </Table.Body>
      </Table>
    </Segment>
  );
};

DownloadsList.propTypes = {
  items: PropTypes.array,
  clearFinishedTracks: PropTypes.func
};

DownloadsList.defaultProps = {
  items: [],
  clearFinishedTracks: () => {}
};

export default DownloadsList;
