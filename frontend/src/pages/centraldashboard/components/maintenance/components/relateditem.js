import React from 'react';
import './relateditem.css';
import dateUtils from '../utils/formatdatetime' ; 
const { formatDate, formatTime } = dateUtils;
const Relateditem = ({ obj }) => {
    console.log(obj)
  if (!obj) return null;

  const isAlarm = 'alarm_code' in obj;
  const isDefectiveEquipment = 'kks' in obj;

  return (
    <div className="related-item-container">
      {isAlarm && (
        <div className="alarm-card">
          <h2>Alarm</h2>
          <p><strong>Alarm Code:</strong> {obj.alarm_code}</p>
          <p><strong>Description:</strong> {obj.description}</p>
          <p><strong>Status:</strong> {obj.status}</p>
          <p><strong>CreatedAt:</strong> {formatDate(obj.created_at)} at {formatTime(obj.created_at)}</p>
          <p><strong>HappenedAt:</strong> {formatDate(obj.happened_at)} at {formatTime(obj.happened_at)}</p>
          <p><strong>ResolvedAt:</strong> {obj.resolved_at ? `${formatDate(obj.resolved_at)} at ${formatTime(obj.resolved_at)}` : '-'}</p>
        </div>
      )}

      {isDefectiveEquipment && (
        <div className="defective-equipment-card">
          <h2>Defective Equipment</h2>
          <p><strong>KKS:</strong> {obj.kks}</p>
          <p><strong>Description:</strong> {obj.description}</p>
          <p><strong>Status:</strong> {obj.status}</p>
          <p><strong>ReportedAt:</strong> {formatDate(obj.reported_at)} at {formatTime(obj.reported_at)}</p>
          <p><strong>CreatedAt:</strong> {formatDate(obj.created_at)} at {formatTime(obj.created_at)}</p>
          <p><strong>FixedAt:</strong> {obj.fixed_at ? `${formatDate(obj.fixed_at)} at ${formatTime(obj.fixed_at)}` : '-'}</p>
        </div>
      )}
    </div>
  );
};

export default Relateditem;