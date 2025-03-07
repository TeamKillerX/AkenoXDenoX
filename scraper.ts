/* # -*- coding: utf-8 -*-
# Credits @xpushz on telegram
# Copyright 2020-2025 (c) Randy W @xtdevs, @xtsea on telegram
#
# from : https://github.com/TeamKillerX
# Channel : @RendyProjects
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

 */

import axios from "axios";
import { AKENOX_API_KEY, API_ENDPOINT } from "./config.ts";

interface AkenoxResponse {
  results: string;
}

export const akenox_gpt = async (
  prompt: string,
  ctx: any,
): Promise<AkenoxResponse> => {
  const url = `${API_ENDPOINT}/ai/akenox/lu-sunda?query=${
    encodeURIComponent(prompt)
  }`;
  const response = await axios.get(url, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "x-api-key": AKENOX_API_KEY,
    },
  });

  return response.data as AkenoxResponse;
};
