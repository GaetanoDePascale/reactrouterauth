import {
	Button,
	Col,
	DatePicker,
	Empty,
	Input,
	InputNumber,
	Row,
	Select,
} from 'antd';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { doAxiosGet } from '../../utils/AxiosCall';

const MSCMockup = (props) => {
	const [setPageTitle, setPageSubtitle] = useOutletContext();

	const [selectedMonth, setSelectedMonth] = useState('');

	const [savedConfigurations, setSavedConfigurations] = useState([]);
	const [selectedConfiguration, setSelectedConfiguration] = useState('');
	const [bonuses, setBonuses] = useState([]);

	useEffect(() => {
		setPageSubtitle('MSC Mockup');
	}, [setPageTitle, setPageSubtitle]);

	const onChangeDate = (date, dateString) => {
		setSelectedMonth(dateString);
	};

	const onChangeConfiguration = (value) => {
		setSelectedConfiguration(value);
	};

	useEffect(() => {
		const fetchData = async () => {
			const savedConfigurationsData = await doAxiosGet(
				'@month_' + selectedMonth.replace('-', '_'),
				props
			);

			const items = [];
			const addNewItem = {
				label: 'Add new',
				value: -1,
			};
			if (savedConfigurationsData.executionResult) {
				savedConfigurationsData.data.forEach((element) => {
					items.push({
						label: element.label,
						value: element.id,
					});
				});
			}
			items.push(addNewItem);

			setSavedConfigurations(items);
		};

		if (selectedMonth === '') {
			setSelectedConfiguration('');
			setBonuses([]);
		} else {
			const result = fetchData().catch(console.error);
		}
	}, [selectedMonth, setSelectedMonth]);

	useEffect(() => {
		const fetchData = async () => {
			const bonuses = await doAxiosGet('@range_bonuses', props);

			if (bonuses.executionResult) {
				setBonuses(bonuses.data);
			} else {
				setBonuses([]);
			}
		};

		if (selectedConfiguration !== '') {
			const result = fetchData().catch(console.error);
		}
	}, [selectedConfiguration]);

	const header1Style = {
		textAlign: 'center',
		color: 'white',
		backgroundColor: 'Highlight',
		border: '1px solid white',
		fontWeight: 'bold',
	};
	const header2Style = {
		textAlign: 'center',
		backgroundColor: 'orange',
		border: '1px solid white',
		fontWeight: 'bold',
	};

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<DatePicker
						onChange={onChangeDate}
						picker='month'
						style={{ width: '250px' }}
					/>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col span={8}>
					<Select
						disabled={selectedMonth === ''}
						options={savedConfigurations}
						style={{ width: '250px' }}
						onChange={onChangeConfiguration}
						value={selectedConfiguration}
					/>
				</Col>
				<Col span={8}>
					{selectedConfiguration === -1 && (
						<Input placeholder='Nome della configurazione' />
					)}
				</Col>
				<Col span={8}>
					<Button disabled={selectedConfiguration === ''}>Save</Button>
				</Col>
			</Row>
			{bonuses.length === 0 && <Empty />}
			{bonuses.length > 0 && (
				<>
					<Row gutter={[16, 16]}>
						<Col span={6} />
						<Col span={6} style={header1Style}>
							Seniority Bonus
						</Col>
						<Col span={12} style={header1Style}>
							Performance Bonus
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col
							span={6}
							style={{
								alignSelf: 'center',
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Job Title
						</Col>
						<Col span={2} style={header2Style}>
							Low
						</Col>
						<Col span={2} style={header2Style}>
							Medium
						</Col>
						<Col span={2} style={header2Style}>
							High
						</Col>
						<Col span={3} style={header2Style}>
							Exceeds expectations
						</Col>
						<Col span={3} style={header2Style}>
							Meets expectations
						</Col>
						<Col span={3} style={header2Style}>
							Does not meet expectations
						</Col>
						<Col span={3} style={header2Style}>
							Unsatisfactory
						</Col>
					</Row>
					{bonuses.map((bonus) => {
						return (
							<Row gutter={[16, 16]}>
								<Col
									span={6}
									style={{ border: '1px solid orange', textAlign: 'center' }}
								>
									{bonus.jobTitle}
								</Col>
								<Col
									span={2}
									style={{ border: '1px solid orange', textAlign: 'center' }}
								>
									<InputNumber
										style={{ width: 50 }}
										size='small'
										value={bonus.Low}
									/>
								</Col>
								<Col
									span={2}
									style={{ border: '1px solid orange', textAlign: 'center' }}
								>
									<InputNumber
										style={{ width: 50 }}
										size='small'
										value={bonus.Medium}
									/>
								</Col>
								<Col
									span={2}
									style={{ border: '1px solid orange', textAlign: 'center' }}
								>
									<InputNumber
										style={{ width: 50 }}
										size='small'
										value={bonus.High}
									/>
								</Col>
								<Col
									span={3}
									style={{ border: '1px solid orange', textAlign: 'center' }}
								>
									<InputNumber
										style={{ width: 50 }}
										size='small'
										value={bonus.ExceedsExpectations}
									/>
								</Col>
								<Col
									span={3}
									style={{ border: '1px solid orange', textAlign: 'center' }}
								>
									<InputNumber
										style={{ width: 50 }}
										size='small'
										value={bonus.MeetsExpectations}
									/>
								</Col>
								<Col
									span={3}
									style={{ border: '1px solid orange', textAlign: 'center' }}
								>
									<InputNumber
										style={{ width: 50 }}
										size='small'
										value={bonus.DoesNotMeetExpectations}
									/>
								</Col>
								<Col
									span={3}
									style={{ border: '1px solid orange', textAlign: 'center' }}
								>
									<InputNumber
										style={{ width: 50 }}
										size='small'
										value={bonus.Unsatisfactory}
									/>
								</Col>
							</Row>
						);
					})}
				</>
			)}
		</>
	);
};

export default MSCMockup;
