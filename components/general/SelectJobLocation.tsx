import { Select } from '@/components/ui/select';
import {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { countryList } from '@/features/utils/countriesList';

interface iProp {
	onChange: (value: string) => void;
	value: string;
}

export default function SelectJobLocation({ onChange, value }: iProp) {
	return (
		<Select
			onValueChange={onChange}
			value={value}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Select location" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Worldwide</SelectLabel>
					<SelectItem
						value="WORLDWIDE"
						className="flex items-center gap-2">
						<span>🌍</span>
						<span>Worldwide / Remote</span>
					</SelectItem>
				</SelectGroup>
				<SelectGroup>
					<SelectLabel>Location</SelectLabel>
					{countryList.map((country) => (
						<SelectItem
							key={country.code}
							value={country.code}
							className="flex items-center gap-2">
							<span>{country.flagEmoji}</span>
							<span>{country.name}</span>
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
