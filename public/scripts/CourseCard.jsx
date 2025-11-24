class CourseCard extends React.Component {
  convert24To12 = (time) => {
     if (!time) return '';

    let AM_PM = "AM";
    const [hours, minutes] = time.split(':');
    let parsedHours = parseInt(hours);
    let parsedMinutes = minutes.substring(0, 2);
    
    if (parsedHours >= 12) {
      AM_PM = "PM";
      parsedHours %= 12;
    }
    
    if (parsedHours === 0) {
      parsedHours = 12;
    }
    
    return `${parsedHours}:${parsedMinutes} ${AM_PM}`;
  }

  render() {
    const { result } = this.props;
    const {
      description, crn, num, section, termname, level, credits,
      start, end, days, location, termstart, termend, scheduletype, instructor
    } = result;

    return (
      <div className="section_container">
        <div className="section_heading">
          <p>{description} - {crn} - {num} - {section}</p>
        </div>
        <div className="section_body">
          <p>Associated Term: {termname}</p>
          <p>Level: {level}</p>
          <p>{credits}.000 Credits</p>
        </div>
        <div className="section_footer">
          <h3 className="section_time_header">Scheduled Meeting Times</h3>
          <table className="section_times">   
            <thead>
              <tr>
                <th>Time</th>
                <th>Days</th>
                <th>Where</th>
                <th>Data Range</th>
                <th>Schedule Type</th>
                <th>Instructors</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.convert24To12(start)} - {this.convert24To12(end)}</td>
                <td>{days}</td>
                <td>{location}</td>
                <td>{termstart} - {termend}</td>
                <td>{scheduletype}</td>
                <td>{instructor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}