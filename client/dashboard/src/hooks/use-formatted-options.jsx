import { useMemo } from "react";

export function useFormattedOptions(data) {
  return useMemo(() => {
    if (!data) return [];
    return data.map(({ id: value, name: label }) => ({ value, label }));
  }, [data]);
}
