import React, { FC, useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import 'react-widgets/dist/css/react-widgets.css';
import { FirebaseContext } from "../../../API/Firebase";
import { MEDITATION_TYPES_ARRAY, STATS_CATEGORIES } from "../../../Constants/constants";
import { formatDateString, formatStringDate, getMeditiationName, getToday } from "../../../Constants/functions";
import { StatisticObj } from "../../../Constants/interfaces";
import BarDiscreteChart from "./BarDiscreteChart";
import LineChart from "./LineChart";

import "./style.css";

const StatsGraphsScreen: FC = () => {

  const firebase = useContext(FirebaseContext);
  const [initialDate, setInitialDate] = useState(new Date(getToday().getTime() - 4 * 7 * 24 * 3600 * 1000));
  const [finalDate, setFinalDate]     = useState(new Date());
  const [stats,setStats] = useState<StatisticObj[]>([]);

  useEffect(() => {
    firebase.getStatsWithDates(initialDate,finalDate)
    .then((objs) => setStats(objs));
    // eslint-disable-next-line
  },[initialDate,finalDate]);

  // const downloadExcel = (e: any) => {
  //   e.preventDefault();
  //   const cols = [
  //     "Unidad",
  //     "Fecha de Inicio",
  //     "Fecha de Corte",
  //     "Nombre Conductor",
  //     "Apellido Conductor",
  //     "Boleto Descuento",
  //     "Boleto Normal",
  //     "Boleto Prepago",
  //     "Boleto Trans",
  //     "Moneda 5CC",
  //     "Moneda 5CG",
  //     "Moneda 1",
  //     "Moneda 2",
  //     "Moneda 5",
  //     "Moneda 10",
  //   ];
  //   let data = [cols];
  //   logs.current.forEach((element) => {
  //     let info = element.data();
  //     data.push([
  //         info.id,
  //         new Date(info.fechaInicio),
  //         new Date(info.fCorte),
  //         info.nombreConductor,
  //         info.apellidoConductor,
  //         info.boletoDesc,
  //         info.boletoNorm,
  //         info.boletoPreP,
  //         info.boletoTrans,
  //         info.moneda5CC,
  //         info.moneda5CG,
  //         info.moneda1,
  //         info.moneda2,
  //         info.moneda5,
  //         info.moneda10
  //     ]);
  //   });
  //   const ws = XLSX.utils.aoa_to_sheet(data);
  //   /* build a workbook */
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Data");
  //   /* generate XLSX file and send to client */
  //   XLSX.writeFile(wb, `Data.xlsx`);
  // };

  const graphMostPopularMeditation = () => {
    const meditationStats = stats.filter((meditation) => meditation.category === STATS_CATEGORIES.mostPopularMeditation);
    const curatedStats = 
    MEDITATION_TYPES_ARRAY.map(type => {
      return {
        "label" : getMeditiationName(type),
        "value" : meditationStats.filter(s => s.value === type).length
      };
    });

    return <Col lg={12} xl={5}>
      <h3>Meditación más Popular</h3>
      <BarDiscreteChart data={curatedStats} />
    </Col>
  }

  const graphPercentageOfUsers = () => {
    const activeUsers = stats.filter((stat) => stat.category === STATS_CATEGORIES.activeUsersPercent);
    const curatedStats = 
    activeUsers.sort((a,b) => a.createdDate.getTime() - b.createdDate.getTime()).map(stat => {
      return {
        "label" : stat.createdDate.toLocaleString().split(",")[0],
        "value" : stat.value
      };
    });

    return <Col lg={12} xl={7} >
      <h3>Porcentaje de Asistencia a Eventos</h3>
      <BarDiscreteChart data={curatedStats} width={600} />
    </Col>
  }

  const graphActiveUsers = () => {
    const activeUsersStats = stats.filter((stat) => stat.category === STATS_CATEGORIES.totalActiveUsers);
    const curatedStats = activeUsersStats.sort((a,b) => b.createdDate.getTime() - a.createdDate.getTime()).map(obj => {return {
      "x" : obj.createdDate,
      "y" : obj.value
    }});

    return <Col xs={12}>
      <h3>Número de Usuarios Activos</h3>
        <LineChart data={[
          {
            values : curatedStats,
            key : "Usuarios Activos"
          },
        ]} xTag="Fecha" />
      </Col>;
  }

  const graphHealthinessOfUsers = () => {
    const activeUsersStats = stats.filter((stat) => stat.category === STATS_CATEGORIES.avgWellBeing);
    const curatedStats = activeUsersStats.sort((a,b) => b.createdDate.getTime() - a.createdDate.getTime()).map(obj => {return {
      "x" : obj.createdDate,
      "y" : obj.value
    }});

    return <Col xs={12}>
      <h3>Promedio de Bienestar General</h3>
        <LineChart data={[
          {
            values : curatedStats,
            key : "Bienestar General"
          },
        ]} xTag="Fecha" colorOffset={1} />
      </Col>;
  }

  const createDatePicker = (id: string, dateValue: Date, setValue : (a : Date) => void) => {
    return <
      Form.Control
      type="date"
      value={formatDateString(dateValue)}
      onChange={(val) => setValue(formatStringDate(val.currentTarget.value))}
    />;
  }

  return <div id="Charts" >
    <div id="datesPicker" >
      <Row>
        <Col xs={12} md={6}>
          <div>
            <h3>Fecha inicial</h3>
            {createDatePicker("Initial Date Picker", initialDate, setInitialDate)}
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div>
            <h3>Fecha final</h3>
            {createDatePicker("Initial Date Picker", finalDate, setFinalDate)}
          </div>
        </Col>
      </Row>
    </div>
    <Row>
      {graphMostPopularMeditation()}
      {graphPercentageOfUsers()}
      {graphActiveUsers()}
      {graphHealthinessOfUsers()}
    </Row>
  </div>;
};

export default StatsGraphsScreen;
